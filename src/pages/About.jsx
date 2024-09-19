const AboutPage = () => {
  return (
    <div className="pt-[5rem]">
      <div className="about-bg flex justify-center items-center">
        <div className="flex justify-center flex-col text-center max-w-xl items-center gap-5">
          <h2
            className="text-6xl font-semibold"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            About Us
          </h2>
          <p
            className="text-2xl md:text-4xl"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            Grand cineplex a secure and dynamic movie management platform.
          </p>
        </div>
      </div>

      <div className="wrapper section-padding flex flex-col md:flex-row justify-between gap-44 text-2xl md:text-4xl">
        <div
          className="left flex-1"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Grand Cineplex is a feature-rich movie management platform designed to
          give users complete control over their movie collections. Users can
          easily create new movies, update details, or delete entries as needed.
          The platform also allows users to browse a vast selection of movies
          and actors, with the ability to mark favorites for quick access. Built
          with a focus on security, Grand Cineplex uses strong multi-factor
          authentication to protect user data and ensure a safe browsing
          experience. Whether you're a casual movie lover or a dedicated
          cinephile, Grand Cineplex offers the perfect balance of flexibility,
          security, and ease of use.
        </div>
        <div
          className="right flex-1"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Grand Cineplex is a dynamic movie management application that empowers
          users to create, delete, and update movies effortlessly. Users can
          explore an extensive range of films and actors, with the option to
          mark their favorites for easy access. To ensure the security of every
          account, the platform is equipped with strong multi-factor
          authentication, providing robust protection for all users.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 wrapper section-padding gap-10">
        <div
          className=" w-full group hover:scale-90 duration-700 rounded-xl overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="1200"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            src="https://images.pexels.com/photos/15663076/pexels-photo-15663076/free-photo-of-a-man-driving-a-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A Man Driving a Car"
          />
        </div>
        <div
          className="translate-y-[-5rem] w-full group hover:scale-90 duration-700 rounded-xl overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="600"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            src="https://images.pexels.com/photos/9060352/pexels-photo-9060352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A Man Driving a Car"
          />
        </div>
        <div
          className="translate-y-[5rem] w-full group hover:scale-90 duration-700 rounded-xl overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            src="https://images.pexels.com/photos/17217984/pexels-photo-17217984/free-photo-of-scandinavian-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A Man Driving a Car"
          />
        </div>
        <div
          className="translate-y-[-5rem] w-full group hover:scale-90 duration-700 rounded-xl overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            src="https://images.pexels.com/photos/17034834/pexels-photo-17034834/free-photo-of-buildings-on-santorini-greece.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A Man Driving a Car"
          />
        </div>
        <div
          className=" w-full group hover:scale-90 duration-700 rounded-xl overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="900"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            src="https://images.pexels.com/photos/16158164/pexels-photo-16158164/free-photo-of-nature-fashion-sunglasses-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A Man Driving a Car"
          />
        </div>
      </div>

      <div
        className="wrapper section-padding text-2xl md:text-4xl"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        This application provides a comprehensive solution for managing movies,
        allowing users to create, delete, and update entries seamlessly. It
        features an extensive movie and actor database with the ability to mark
        favorites. Security is emphasized with multi-factor authentication, and
        future updates will include personalized recommendations and social
        sharing options.
      </div>
    </div>
  );
};

export default AboutPage;
