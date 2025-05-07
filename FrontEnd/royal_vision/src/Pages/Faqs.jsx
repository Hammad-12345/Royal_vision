import Accordian from "../Component/Accordian";

const faqs = [
  {
    question: "What is Royal Vision Global Partner?",
    answer:
      "Royal Vision Global Partner is a trusted trading firm specializing in Forex, commodities, and digital assets with advanced investment and portfolio services.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We provide Forex trading, PAMM account management, crypto-based payment solutions, automated profit distribution, and real-time tracking systems.",
  },
  {
    question: "What is a PAMM Account?",
    answer:
      "A PAMM account allows investors to allocate their funds to professional traders who manage the trading. Profits and losses are shared based on percentage allocations.",
  },
  {
    question: "Is my investment safe with Royal Vision Global Partner?",
    answer:
      "Yes, we use SSL encryption, two-factor authentication (2FA), and comply with KYC/AML regulations to ensure your investment is secure.",
  },
  {
    question: "Do you accept cryptocurrency payments?",
    answer:
      "Yes, we accept various cryptocurrencies to facilitate fast and secure global transactions.",
  },
  {
    question: "How can I get started?",
    answer:
      "Contact our support team or register on our website. We will assist you in setting up your account and starting your investment journey.",
  },
  {
    question: "Is there a minimum investment required?",
    answer:
      "Yes, minimum investment varies by account type. Please reach out to our team for specific details.",
  },
  {
    question: "Is Percent Allocation Money Management safe?",
    answer: "Yes, funds are managed professionally with live access.",
  },
  {
    question: "How is the withdrawal process?",
    answer: "You can withdraw your profits daily.",
  },
  {
    question: "Do I need to know trading?",
    answer: "No, you just need to invest, the expert handles everything.",
  },
  {
    question: "How can I see the results?",
    answer: "You can track every movement on the dashboard in realtime.",
  },
  {
    question: "How can I withdraw my profits or funds?",
    answer: "You need to inform the fund manager at least 90 days before your desired withdrawal date.",
  },
];

const Faqs = () => {
  return (
    <div className="bg-blue-950 text-white py-10 px-5 md:px-20 font-poppins bg-cover bg-no-repeat" style={{
      backgroundImage: `url(/Faqsbg.jpg)`,
      backgroundColor: "rgba(31, 41, 55, 0.75)",
      backgroundBlendMode: "multiply",
      backgroundAttachment:"fixed"
      // bac
    }}>
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        <Accordian accordian={faqs} />
      </div>
    </div>
  );
};

export default Faqs;
