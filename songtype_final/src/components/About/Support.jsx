import {
  AboutCode,
  AboutDiscord,
  AboutMail,
  AboutSupport,
  AboutX,
} from "../../assets/icons/AboutIcons";

const Support = () => {
  return (
    <>
      <section className="about-content">
        <h2>support</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt porro
          adipisci, aperiam quas cumque tempore tempora earum soluta repudiandae
          doloribus eaque ut veritatis, unde dignissimos architecto animi modi
          velit ea.
        </p>
        <button className="about-button">
          <AboutSupport />
          Support
        </button>
      </section>

      <section className="about-content">
        <h2>support</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
          quisquam labore ratione dolorem fugit aut vel aliquid cupiditate quod
          mollitia consequatur, eius exercitationem. Laboriosam, numquam neque
          asperiores totam eligendi molestias.
        </p>
        <div className="contact-buttons">
          <button className="about-button">
            <AboutMail />
            Mail
          </button>
          <button className="about-button">
            <AboutX />
            Twitter
          </button>
          <button className="about-button">
            <AboutDiscord />
            Discord
          </button>
          <button className="about-button">
            <AboutCode />
            GitHub
          </button>
        </div>
      </section>
    </>
  );
};

export default Support;
