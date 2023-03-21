import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, Input, SearchBtn } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    if (this.state.inputValue.trim() === '') {
      return toast.info('Необхідно ввести слово для пошуку');
    }
    this.props.handleSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSearch}>
          <Input onChange={this.handleChange} value={this.state.inputValue} />
          <SearchBtn>
            <FaSearch />
          </SearchBtn>
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
