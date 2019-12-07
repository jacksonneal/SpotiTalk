import React, {Component} from 'react';

class Privacy extends Component {
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col font-weight-bold h4">
              SpotiTalk Privacy Policy
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              We at SpotiTalk want to let you, the user, know what information
              we collect and use.
            </div>
          </div>
          <div className="row">
            <div className="col text-justify font-weight-bold">
              Account Information
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              When you sign up for SpotiTalk we will collect the username and
              this will be publicly available to other users on the site. You
              are not required to use your actual name, and your password will
              remain for your eyes only.
            </div>
          </div>
          <div className="row">
            <div className="col text-justify font-weight-bold">
              Actions you take
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              In order to provide the best experience possible, we also collect
              the actions you take on SpotiTalk. This includes writing forum
              posts and comments, searching for songs and albums, and visiting
              user profiles.
            </div>
          </div>

          <div className="row mt-4">
            <div className="col font-weight-bold h5">
              Information Collected Automatically
            </div>
          </div>

          <div className="row">
            <div className="col text-justify font-weight-bold">
              Website Usage and Logs
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              When you use the website, we reserve the right to collect
              information about this usage regardless of user account. This
              includes using the website’s search functionality, interacting
              with forum posts and comments, and interacting with user pages.
            </div>
          </div>

          <div className="row mt-4">
            <div className="col font-weight-bold h5">
              How We Use This Information
            </div>
          </div>
          <div className="row">
            <div className="col text-justify font-weight-bold">
              Website Performance
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              We reserve the right to use logs provided from user actions to
              focus our efforts on the parts of the website are generating the
              most amounts of traffic.
            </div>
          </div>

          <div className="row">
            <div className="col text-justify font-weight-bold">
              Website Moderation
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              Users found in violation of our content guidelines will have their
              account revoked. We reserve the right to use user information
              collected to prevent the same user from creating a new account.
            </div>
          </div>

          <div className="row">
            <div className="col text-justify font-weight-bold">
              3rd Party Sales
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              We reserve the right to use and share anonymised user data and
              insights with ad, analytics, and marketing partners.
            </div>
          </div>

          <div className="row">
            <div className="col text-justify font-weight-bold">
              Compliance with Governing Bodies
            </div>
          </div>
          <div className="row">
            <div className="col text-justify">
              We reserve the right to retain content submitted to the website as
              may be required by law.
            </div>
          </div>

        </div>
    )
  }
}

export default Privacy
