import React from "react";
import UserDefault from "../assets/img/user_default.svg";
import dayjs from "dayjs";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.handleImgError = this.handleImgError.bind(this);
  }
  handleImgError(e) {
    e.target.src = UserDefault;
  }
  formatDatePtBr = (date) => {
    return !date ? "" : dayjs(date).format("DD/MM/YYYY");
  };

  render() {
    const { data } = this.props;
    return (
      <article className="contact" data-testid="contact">
        <span className="contact__avatar" data-testid="contact-avatar">
          <img
            src={data.avatar}
            alt="name"
            referrerPolicy="no-referrer"
            onError={this.handleImgError}
          />
        </span>

        <span className="contact__data" data-testid="contact-name">
          {data.name}
        </span>

        <span className="contact__data" data-testid="contact-phone">
          {data.phone}
        </span>

        <span className="contact__data" data-testid="contact-country">
          {data.country}
        </span>

        <span className="contact__data" data-testid="contact-date">
          {this.formatDatePtBr(data.admissionDate)}
        </span>

        <span className="contact__data" data-testid="contact-company">
          {data.company}
        </span>

        <span className="contact__data" data-testid="contact-department">
          {data.department}
        </span>
      </article>
    );
  }
}

export default Contact;
