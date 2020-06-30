import React, {Component} from 'react';
import Card from '../components/card/card';
import $ from "jquery";
import './showData.css'

class ShowData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        todo: this.props.data,
        currentPage: 1,
        todosPerPage: 10,
        upperPageBound: 10,
        lowerPageBound: 0,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        pageBound: 10
      };
      this.handleClick = this.handleClick.bind(this);
      this.btnDecrementClick = this.btnDecrementClick.bind(this);
      this.btnIncrementClick = this.btnIncrementClick.bind(this);
      this.btnNextClick = this.btnNextClick.bind(this);
      this.btnPrevClick = this.btnPrevClick.bind(this);
      //this.componentDidMount = this.componentDidMount.bind(this);
      this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);

    }
    componentDidUpdate() {
        $("ul.pagination li.active").removeClass('active');
        $('ul.pagination li#'+this.state.currentPage).addClass('active');
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({
          todo: nextProps.data
        })
    }
    handleClick(event) {
      let listid = Number(event.target.id);
      this.setState({
        currentPage: listid
      });
      $("ul.pagination li.active").removeClass('active');
      $('ul.pagination li#'+listid).addClass('active');
      this.setPrevAndNextBtnClass(listid);
    }
    setPrevAndNextBtnClass(listid) {
      let totalPage = Math.ceil(this.state.todo.length / this.state.todosPerPage);
      this.setState({isNextBtnActive: 'disabled'});
      this.setState({isPrevBtnActive: 'disabled'});
      if(totalPage === listid && totalPage > 1){
          this.setState({isPrevBtnActive: ''});
      }
      else if(listid === 1 && totalPage > 1){
          this.setState({isNextBtnActive: ''});
      }
      else if(totalPage > 1){
          this.setState({isNextBtnActive: ''});
          this.setState({isPrevBtnActive: ''});
      }
  }
    btnIncrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
        return false;
  }
    btnDecrementClick() {

      this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      let listid = this.state.upperPageBound - this.state.pageBound;
      this.setState({ currentPage: listid});
      this.setPrevAndNextBtnClass(listid);
      return false;
  }
  btnPrevClick() {
      
      if((this.state.currentPage -1)%this.state.pageBound === 0 ){
          this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      }
      let listid = this.state.currentPage - 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
      return false;
  }
  btnNextClick() {
      if((this.state.currentPage +1) > this.state.upperPageBound ){
          this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
      }
      let listid = this.state.currentPage + 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
      return false;
  }
  scrollToView = () =>{
      $('html, body').animate({
        scrollTop: $("#searchBox").offset().top
      }, 500);
  }
    render() {
      const { todo, currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      // Logic for displaying current todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = todo.slice(indexOfFirstTodo, indexOfLastTodo);
      const renderTodos = currentTodos.map((todo, index) => {
        return <Card key={index} data={todo} index={index}/>;
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(todo.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
       
          if(number === 1 && currentPage === 1){
              return(
                <li key={number} className="active" id={number}><span id={number}> {number} </span></li>
                //<li key={number} className='active' id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
              )
          }
          else if((number < upperPageBound + 1) && number > lowerPageBound){
              return(
                  (currentPage === number)?
                  <li key={number} id={number}><span id={number}> {number} </span></li>
                  :
                  <li key={number} id={number}><a href='#' id={number} onClick={this.handleClick} aria-label={`go to page ${number} of result list`}>{number}</a></li>
              )
          }
          return null;
      });
      let pageIncrementBtn = null;
      if(pageNumbers.length > upperPageBound){
          pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick} aria-label="expand more result pages"> &hellip; </a></li>
      }
      let pageDecrementBtn = null;
      if(lowerPageBound >= 1){
          pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick} aria-label="collape result pages"> &hellip; </a></li>
      }
      let renderPrevBtn = null;
      if(isPrevBtnActive === 'disabled') {
          renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
      }
      else{
          renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick} aria-label="go to previous page of result list"> Prev </a></li>
      }
      let renderNextBtn = null;
      if(isNextBtnActive === 'disabled') {
          renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
      }
      else{
          renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick} aria-label=" go to Next page of result list"> Next </a></li>
      }
      return (
        <div className="search-result-wrapper" id="searchResultWrapper">
          <div className="search-result margin-tp-5">
                   {renderTodos}
          </div>
            <div className="pagination-wrapper margin-tp-5 margin-bttm-2">
              <ul className="pagination">
                {renderPrevBtn}
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                {renderNextBtn}
              </ul>
          </div>
        </div>
      );
    }

  }


export default ShowData;