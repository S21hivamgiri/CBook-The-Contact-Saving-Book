import React, { Component } from 'react'
import ContactService from '../services/contact.service'
var rate = "";
var error = "";

export default class feedback extends Component {
  constructor() {
    super();
    this.state = {
      rating: '',
      formFields: {
        star1: "fa fa-star ",
        star2: "fa fa-star ",
        star3: "fa fa-star ",
        star4: "fa fa-star ",
        star5: "fa fa-star ",
        rating: ''
      },
      error,
      subFields: {
        rating: '',
        feedback: ''
      }
    }
  }

  handleClick = (item) => {
    let formfields = this.state.formFields;
    for (let i = 1; i <= 5; ++i) {
      formfields["star" + i] = "fa fa-star ";
    }
    rate = "/5"
    formfields["rating"] = item;
    this.setState({
      formFields: formfields,
      error: ''
    });
    for (let i = 1; i <= item; ++i) {
      formfields["star" + i] = this.state.formFields["star" + i] + " text-warning";
    }
    this.setState({
      formFields: formfields
    });
  }
  
  componentDidMount() {
    ContactService.getFeedback().then(res => {
      if (res.data.length > 0) {
        this.setState({
          rating: res.data[0].avg
        });
      } else {
        this.setState({
          rating: "0"
        });
      }
    });
  }
  
  handleSubmit = () => {
    if ((this.state.formFields.rating) === '')
      this.setState({
        error: "Please Rate our Service"
      });
    else {
      error = "";
      let subFields = this.state.subFields;
      subFields["feedback"] = this.refs.feedback.value;
      subFields["rating"] = this.state.formFields.rating;
      this.setState({
        subFields: subFields
      });
      ContactService.sendFeedBack(this.state.subFields).then((res) => {

        if (res.status === 201) {
          let formfields = this.state.formFields;
          this.refs.feedback.value = "";
          for (let i = 1; i <= 5; ++i) {
            formfields["star" + i] = "fa fa-star ";
          }
          formfields["rating"] = "";
          rate = "";
          this.setState({
            formFields: formfields
          });
        }
      });
    }
    this.componentDidMount()
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 col-sm-3 col-xl-3 col-lg-3"></div>
          <div className="col-12 col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <div className="alert text-center jumbotron my-0 alert-dismissible fade show" role="alert">
              <div className="h1 dispaly-6 text-warning">
                FeedBack
              </div>
              <div className="display-5">
                <strong className=" text-warning">Feedback!</strong>
                You should check in on some of those fields below.
                <br />Your FeedBack is Essential to Make our Product better.<br />
                <span className='text-secondary h4'>Present Rating:(
                  <span className="h3 text-warning font-weight-bold">
                    {Math.trunc(this.state.rating * Math.pow(10, 2)) / Math.pow(10, 2)}
                    <i class="fa fa-star" aria-hidden="true"></i>
                  </span> )
                </span>
              </div>
              <br />
              <div>
                <div className="alert alert-warning mx-5">
                  Please rate Our Experiance:
                    <div className="h4 font-weight-bolder ">
                    <span className={this.state.formFields.star1} onClick={() => this.handleClick("1")} />
                    <span className={this.state.formFields.star2} onClick={() => this.handleClick("2")} />
                    <span className={this.state.formFields.star3} onClick={() => this.handleClick("3")} />
                    <span className={this.state.formFields.star4} onClick={() => this.handleClick("4")} />
                    <span className={this.state.formFields.star5} onClick={() => this.handleClick("5")} />
                    <span className="px-5">{this.state.formFields.rating + rate}</span>
                    <div>
                      <span className="h5">
                        Enter Your Commment:
                        <span>
                          <br /><textarea rows={4} cols={30} ref="feedback" name="feedback" className=" border border-warning rounded" placeholder="Enter Your Commment" required />
                          <span className="text-danger h6">
                            {this.state.error}
                          </span>
                          <div>
                            <div className="form-group">
                              <input type="submit" className="btn btn-warning form-control" id="submit" name="submit" value="Send FeedBack" required onClick={this.handleSubmit} />
                            </div>
                          </div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3 col-xl-3 col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
