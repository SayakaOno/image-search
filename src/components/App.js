import React, { Component } from 'react';
import Modal from 'react-modal';
import Search from './Search';
import NavBar from './NavBar';
import ImageList from './ImageList';
import { google, url } from '../api/google';
import Loader from './Loader';
import testdata from '../testdata/data';

Modal.setAppElement(document.getElementById('root'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      term: '',
      requestedName: '',
      selectedIndex: 0,
      imageListWidth: 0,
      loading: false,
      images: [],
      screenHeight: 0,
      modalIsOpen: false
    };

    this.searchButtonRef = React.createRef();
    this.imageListRef = React.createRef();
    this.smLabel = React.createRef();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  //for test
  // componentDidMount() {
  //   this.setState(testdata);
  // }
  fixResultComponent() {
    const imageList = document.querySelector('.image-list');
    if (!imageList) {
      return;
    }
    if (
      imageList.getBoundingClientRect().top >
      document.documentElement.clientHeight * 0.4
    ) {
      imageList.style.overflowY = 'hidden';
    } else {
      try {
        imageList.style.overflowY = 'scroll';
      } catch (err) {
        console.log(err);
      }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixResultComponent);
    window.addEventListener('resize', this.setImageListWidth);
    this.setState({ screenHeight: document.documentElement.clientHeight });
    setTimeout(() => {
      let count = 0;
      let id = setInterval(() => {
        if (count < 3) {
          this.smLabel.current.classList.toggle('none');
          count++;
        } else {
          clearInterval(id);
          setTimeout(() => {
            this.smLabel.current.classList.add('none');
          }, 1500);
        }
      }, 700);
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixResultComponent);
    window.removeEventListener('resize', this.setImageListWidth);
  }

  componentDidUpdate() {
    if (!this.imageListRef.current) {
      return;
    }
    if (this.state.imageListWidth !== this.imageListRef.current.offsetWidth) {
      this.setState({ imageListWidth: this.imageListRef.current.offsetWidth });
    }
    if (this.state.screenHeight !== document.documentElement.clientHeight) {
      this.setState({ screenHeight: document.documentElement.clientHeight });
    }
  }

  setImageListWidth = () => {
    if (!this.imageListRef.current) {
      return;
    }
    this.setState({ imageListWidth: this.imageListRef.current.offsetWidth });
  };

  isInputEmpty = () => {
    return !this.state.term;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const classNames = 'ui yellow button';
    setTimeout(() => {
      this.state.name || this.state.term
        ? (this.searchButtonRef.current.className = classNames)
        : (this.searchButtonRef.current.className = classNames + ' disabled');
    }, 0);
  };

  onSearchSubmit = async (start = 1, e = null) => {
    this.setState({ loading: true });
    let term = this.state.term;
    try {
      // for load more
      if (!term) {
        term = this.state.images[this.state.selectedIndex][0].term;
      }
      const response = await google.get(url, {
        params: {
          searchType: 'image',
          q: this.state.name + '+' + term,
          start: start
          //TODO: gl:
        }
      });
      let data = response.data.items;
      if (!data) {
        throw Error;
      }
      let selectedIndex = this.state.selectedIndex;
      let images = [];

      if (start === 1) {
        let newImage = [{ term: this.state.term, list: data }];
        images = this.state.images.concat([newImage]);
        selectedIndex = images.length - 1;
      } else {
        const updatedImages = this.state.images[selectedIndex][0].list.concat(
          data
        );
        images = this.state.images.slice();
        images[selectedIndex][0].list = updatedImages;
      }

      if (e && !this.state.term) {
        return;
      }
      this.setState(prevState => {
        return {
          term: '',
          selectedIndex,
          requestedName: this.state.name,
          loading: false,
          images
        };
      });
    } catch (e) {
      this.setState({ loading: false, term: '' });
      setTimeout(
        () =>
          alert(
            `I am sorry but something went wrong... :(\nPlease ask your server what "${term}" is.`
          ),
        100
      );
    }
  };

  handleSubmit = e => {
    if (this.isInputEmpty()) {
      alert('Please enter menu!');
      return;
    }
    const selectedIndex = this.state.images.findIndex(item => {
      return item[0].term === this.state.term;
    });
    if (selectedIndex !== -1 && this.state.name === this.state.requestedName) {
      this.setState({ selectedIndex, term: '' });
      return;
    }

    if (this.state.requestedName !== this.state.name) {
      this.setState({ images: [], requestedName: '' });
    }
    this.onSearchSubmit(1, e);
  };

  handleSelect = item => {
    const index = this.state.images.findIndex(image => image[0].term === item);
    this.setState({ selectedIndex: index });
  };

  // shouldn't work when Japanese typed
  handleKeyDown = e => {
    if (e.key !== 'Enter') {
      return;
    }
    this.handleSubmit();
  };

  removeNavItem = () => {
    const selectedIndex = Math.min(
      this.state.images.length - 2,
      this.state.selectedIndex
    );
    this.setState(prevState => {
      return {
        images: prevState.images.filter((item, index) => {
          return this.state.selectedIndex !== index;
        }),
        selectedIndex
      };
    });
  };

  renderResultComponents = () => {
    const { selectedIndex, images } = this.state;
    return (
      <React.Fragment>
        <NavBar
          onSelect={this.handleSelect}
          selectedIndex={selectedIndex}
          imageListWidth={this.state.imageListWidth}
          images={images}
          onRemove={this.removeNavItem}
        />
        {this.state.loading && !this.state.requestedName ? (
          <Loader />
        ) : (
          <ImageList
            ref={this.imageListRef}
            height={this.state.screenHeight - 80}
            images={images[selectedIndex]}
            onLoadMore={this.onSearchSubmit}
            loading={this.state.loading}
          />
        )}
      </React.Fragment>
    );
  };

  render() {
    const { name, term } = this.state;
    return (
      <main>
        <React.StrictMode>
          <h1>
            Image search
            <span
              className='pc'
              onClick={this.openModal}
              data-tooltip='instructions'
              data-position='right center'
            >
              ?
            </span>
            <span
              ref={this.smLabel}
              className='none sm ui pointing below red basic label'
            >
              instructions
            </span>
          </h1>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          >
            <div className='ui modal active'>
              <i className='close icon' onClick={this.closeModal} />
              <div className='header'>Instructions</div>
              <div className='content'>
                <div className='description'>
                  <ol>
                    <li>
                      Type restaurant and menu name
                      <i>Ex. Medina & waffle </i>
                    </li>
                    <li>Press search button</li>
                    <li>
                      Keep searching different menus until you find what you
                      want to try!
                      <br />
                      <i>Ex. Paella, Cassoulet</i>{' '}
                    </li>
                  </ol>
                  <p> Enjoy! :)</p>
                </div>
              </div>
              <div className='actions'>
                <div
                  className='ui right labeled icon button'
                  onClick={this.closeModal}
                >
                  Got it!
                  <i className='checkmark icon' />
                </div>
              </div>
            </div>
          </Modal>
          <Search
            ref={this.searchButtonRef}
            name={name}
            term={term}
            onChange={this.handleChange}
            onClick={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
          />
          <button
            ref={this.searchButtonRef}
            className='ui yellow button disabled'
            onClick={this.handleSubmit}
          >
            Search
          </button>
          {this.renderResultComponents()}
        </React.StrictMode>
      </main>
    );
  }
}

export default App;
