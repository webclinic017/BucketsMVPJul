import React, { useEffect, useRef, useState } from "react";
const WaitingList = ({ showList, closeModal, refferal }) => {
  const modalRef = useRef();
  const [WaitinglistArray, setWaitinglistArray] = useState([]);
  useEffect(() => {
    if (showList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const getWaitingList = async () => {
      const WaitinglistFromServer = await fetchWaitingList();
      if (WaitinglistFromServer.success) {
        setWaitinglistArray(WaitinglistFromServer.users);
      }
      console.log(WaitinglistArray);
    };
    // getWaitingList();
  }, [showList]);

  const fetchWaitingList = async () => {
    const res = await fetch(
      "https://buckets-rahul-server.herokuapp.com/referral/get-all-referrals"
    );
    const data = await res.json();
    return data;
  };
  const closeWaitinglist = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };
  const closeButtonClick = () => {
    closeModal();
  };
  const copyLink = () => {
    const copyText = document.getElementById("waitinglist-sharing-plain-link");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  };
  return (
    <>
      {showList ? (
        <div
          className="waitingListBackground"
          onClick={(e) => closeWaitinglist(e)}
          ref={modalRef}
        >
          <div id="waitinglist-popup-close" onClick={closeButtonClick}>
            ×
          </div>
          <div id="waitinglist-popup-body">
            <div id="waitinglist-sharing-screen">
              <div id="waitinglist-sharing-body">
                <div id="waitinglist-sharing-main-container">
                  <div id="waitinglist-sharing-head">
                    <h2 id="waitinglist-sharing-header">You're in!</h2>
                    <h3 id="waitinglist-sharing-subheader">
                      Share with your friends to move up the waitlist and win
                      prizes
                    </h3>
                  </div>
                  {/* <div id="waitinglist-sharing-leaderboard">
                    <table
                      id="waitinglist-lb-table"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th className="waitinglist-lb-position">Position</th>
                          <th className="waitinglist-lb-subscriber">Name</th>
                          <th className="waitinglist-lb-points">Referrals</th>
                        </tr>
                      </thead>
                      <tbody>
                        {WaitinglistArray.map((candidate, i) => {
                          <tr>
                            <td>{i}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.referrer}</td>
                          </tr>;
                        })}
                      </tbody>
                    </table>
                    <div id="waitinglist-lb-footnote">
                      More referrals earns you more entries to win and moves you
                      up the waiting list!
                    </div>
                  </div> */}
                  <div id="waitinglist-sharing-socials-container">
                    <p id="waitinglist-sharing-instructions">
                      Invite your friends with your unique referral link 👇
                    </p>
                    <a id="waitinglist-sharing-plain-container">
                      <input
                        id="waitinglist-sharing-plain-link"
                        readonly=""
                        type="text"
                        value={
                          "https://www.bucketsinvesting.com/?code=" +
                          refferal.code
                        }
                      />
                      <button
                        id="waitinglist-sharing-link-button"
                        onClick={copyLink}
                      >
                        Copy
                      </button>
                    </a>
                    <a
                      id="waitinglist-sharing-social-facebook"
                      class="waitinglist-sharing-social"
                      target="_blank"
                      title="Share on Facebook"
                      href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.investblossom.ca%2F%3Fmwr%3Dasd-1d31%26mws%3Dfacebook"
                    ></a>
                    <a
                      id="waitinglist-sharing-social-twitter"
                      class="waitinglist-sharing-social"
                      title="Share on Twitter"
                      target="_blank"
                      href="https://twitter.com/intent/tweet?text=I%20just%20signed%20up%20on%20this%20awesome%20website!%20https%3A%2F%2Fwww.investblossom.ca%2F%3Fmwr%3Dasd-1d31%26mws%3Dtwitter"
                    ></a>
                    <a
                      id="waitinglist-sharing-social-whatsapp"
                      target="_blank"
                      class="waitinglist-sharing-social"
                      title="Share on Whatsapp"
                      href="https://api.whatsapp.com/send?text=You%20should%20really%20check%20this%20out%20https%3A%2F%2Fwww.investblossom.ca%2F%3Fmwr%3Dasd-1d31%26mws%3Dwhatsapp"
                    ></a>
                    <a
                      id="waitinglist-sharing-social-facebook-messenger"
                      target="_blank"
                      class="waitinglist-sharing-social"
                      title="Share on Facebook Messenger"
                      href="https://www.facebook.com/v2.8/dialog/send?app_id=885310524899839&amp;link=https%3A%2F%2Fwww.investblossom.ca%2F%3Fmwr%3Dasd-1d31%26mws%3Dfacebook_messenger&amp;redirect_uri=https%3A%2F%2Fwww.investblossom.ca%2F&amp;relation=opener&amp;display=popup&amp;mobile_iframe=true&amp;sdk=joey"
                    ></a>
                    <a
                      id="waitinglist-sharing-social-email"
                      target="_blank"
                      class="waitinglist-sharing-social"
                      title="Share on Email"
                      href="mailto:?subject=Check%20this%20out&amp;body=https%3A%2F%2Fwww.investblossom.ca%2F%3Fmwr%3Dasd-1d31%26mws%3Demail"
                    ></a>
                    <a
                      id="waitinglist-sharing-social-linkedin"
                      target="_blank"
                      class="waitinglist-sharing-social"
                      title="Share on Linkedin"
                      href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwww.investblossom.ca%2F%3Fmwr%3Dasd-1d31%26mws%3Dlinkedin&amp;title=undefined"
                    ></a>
                    <a
                      id="waitinglist-sharing-social-reddit"
                      target="_blank"
                      class="waitinglist-sharing-social"
                      title="Share on Reddit"
                      href="https://www.reddit.com/submit?url=https%3A%2F%2Fwww.investblossom.ca%2F%3Fmwr%3Dasd-1d31%26mws%3Dreddit&amp;title="
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WaitingList;
