import React from "react";

const Aboutus = () => {
  return (
    <>
      <div className="space-y-8 font-poppins bg-gradient-to-r from-black via-blue-950 to-black text-gray-300">
        <h1 className="text-4xl text-blue-600 font-extrabold text-center">
          About Us
        </h1>

        {/* Company Overview */}
        <section className="space-y-2 relative">
          <h2 className="text-2xl text-white font-semibold">
            Company Overview
          </h2>
          <p>
            Unlock Your Financial Freedom with Overland Solution! We ignite your investment journey, 
            fueling your growth with expert guidance and proven strategies. Start with a single step, 
            and we'll empower you to soar. Join our community of savvy investors and transform your 
            financial future today!
          </p>
        </section>

        {/* Mission Statement */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">
            Mission Statement
          </h2>
          <p>
            Empowering financial success through innovative solutions, advanced
            analytics, and personalized strategies.
          </p>
        </section>

        {/* Vision Statement */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">
            Vision Statement
          </h2>
          <p>
            To attain global leadership as the premier investment partner, distinguished by exceptional 
            performance, unwavering integrity, and unrelenting commitment to client success.
          </p>
        </section>

        {/* Our Specialization */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">
            What We Specialize In
          </h2>
          <ul className="list-disc px-5">
            <li>Investment management</li>
            <li>Portfolio management</li>
            <li>Wealth creation</li>
            <li>Financial planning</li>
            <li>Business investments</li>
          </ul>
        </section>

        {/* Team Introduction */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">Our Team</h2>
          <p>
            Our team comprises seasoned professionals with expertise in investment management, finance, 
            and business development. We're supported by a dynamic think tank that collaborates with 
            us to drive innovation and excellence. Together, we're dedicated to delivering exceptional 
            results and empowering our clients to achieve their financial goals.
          </p>
        </section>

        {/* Closing Paragraph */}
        <section className="space-y-2">
          <p>
            What sets us apart is not just our technology, but our vision. A
            vision where success is mutual, growth is consistent, and
            partnerships are global. Every service we offer is designed with one
            goal in mind — to turn opportunity into prosperity.
          </p>
          <p>
            Join Overland Solutions today and be part of a trading ecosystem
            where your success is our priority.
          </p>
        </section>
      </div>
    </>
  );
};

export default Aboutus;
