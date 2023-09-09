export function About() {
  return (
    <section className="about">
      <section className={"vision"}>
        <h3>Our vision</h3>
        <p>
          Welcome to our website, where we're dedicated to organizing and
          providing universal access to the world's wealth of information. Our
          mission is to create user-centric experiences and leverage
          cutting-edge technology to connect you with the knowledge you seek, no
          matter where you are. Join us as we explore the exciting journey of
          information accessibility and technology's ever-evolving impact on our
          digital world. Together, we'll shape a future where information is
          readily available and incredibly useful for everyone.
        </p>
      </section>
      <section className={"team"}>
        <h3>Our team</h3>
        <p>
          Our team is a dynamic and diverse group of individuals, united by a
          shared passion for innovation and a commitment to excellence. With a
          wealth of experience and expertise in various fields, we come together
          to tackle challenges, drive creativity, and deliver results. We thrive
          on collaboration and are fueled by a collective determination to
          exceed expectations. Together, we're not just a team; we're a family,
          working harmoniously to bring our vision to life and make a positive
          impact on the world. Together, Carmel and Almog complement each
          other's skills and drive our team's success.
        </p>
        <div className={"team-members"}>
          <div className={"member flex column align-center"}>
            <img
              className={"about-img"}
              src="assets/about/Carmel Amarillio-modified.png"
              alt=""
            />
            <h4>Carmel Amarilio</h4>
            <p>
              A tech visionary with a knack for problem-solving, Carmel brings a
              wealth of technical expertise to the table. His relentless
              curiosity and innovative mindset have earned him a reputation for
              turning complex challenges into elegant solutions. Whether it's
              coding late into the night or leading brainstorming sessions,
              Carmel's passion for technology shines through, inspiring us all.
            </p>
          </div>
          <div className={"member flex column align-center"}>
            <img
              className={"about-img"}
              src="assets/about/44FCE2B4-BB8A-4ED9-BEDD-8981892718BB-modified.png"
              alt=""
            />
            <h4>Almog Jan</h4>
            <p>
              Our creative powerhouse, Almog infuses our team with artistic
              flair and an eye for design. With a background in graphic arts and
              a keen sense of aesthetics, she transforms ideas into visually
              stunning realities. Almog's attention to detail, paired with her
              ability to think outside the box, makes her an invaluable asset in
              shaping our projects and ensuring they resonate with our audience.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
