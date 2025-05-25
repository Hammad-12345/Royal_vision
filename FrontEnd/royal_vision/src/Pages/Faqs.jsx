import Accordian from "../Component/Accordian";

const faqs = [
  {
    question: "What types of projects does Overland Solution offer?",
    answer: "We offer investment opportunities in various projects, including e-commerce, forex trading, hospitality, natural resources, real estate, and construction.",
  },
  {
    question: "How do I invest in Overland Solution projects?",
    answer: "You can invest in any project that interests you by contacting us directly. Our team will guide you through the investment process.",
  },
  {
    question: "What kind of returns can I expect?",
    answer: "Returns vary by project and are outlined in our company policy. We offer dividends and retainers as part of our investment structure.",
  },
  {
    question: "Who manages these projects?",
    answer: "Each project is managed by an experienced CEO, and all CEOs report to the CEO of Overland Solution, ensuring accountability and oversight.",
  },
  {
    question: "Is my investment secure?",
    answer: "We strive to provide a secure investment environment, but like any investment, there are risks. We manage these risks through careful project selection and oversight.",
  },
  {
    question: "How do I track my investment performance?",
    answer: "You'll receive regular updates on your investment performance. You can also contact our team for specific inquiries.",
  },
  {
    question: "Can I invest online or physically?",
    answer: "Both! We offer opportunities for online and physical investments, providing flexibility for our investors.",
  },
];

const Faqs = () => {
  return (
    <div className="bg-blue-950 text-white py-10 px-5 md:px-20 font-poppins bg-cover bg-no-repeat" style={{
      backgroundImage: `url(https://d3hwx9f38knfi9.cloudfront.net/Faqsbg.jpg)`,
      backgroundColor: "rgba(31, 41, 55, 0.75)",
      backgroundBlendMode: "multiply",
      backgroundAttachment:"fixed"
      // bac
    }}>
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently <span className="text-blue-600 font-extrabold">Asked Questions</span>
      </h2>
      <div className="max-w-4xl mx-auto space-y-4 relative">
        <Accordian accordian={faqs} />
      </div>
    </div>
  );
};

export default Faqs;
