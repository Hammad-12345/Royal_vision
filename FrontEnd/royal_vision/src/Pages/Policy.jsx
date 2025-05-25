import React from "react";

const Policy = () => {
  const policies = [
    {
      maintitle: "Core Values",
      subtitle: [
        "Integrity: We operate with transparency, honesty, and ethics in all our dealings.",
        "Innovation: We continuously seek new opportunities and solutions to drive growth and success.",
        "Accountability: We take responsibility for our actions and decisions, ensuring the highest level of professionalism.",
        "Excellence: We strive for outstanding performance in all aspects of our business.",
        "Trust: We build and maintain trust with our investors, partners, and stakeholders through open communication and reliability.",
        "Adaptability: We remain flexible and responsive to changing market conditions and investor needs."
      ]
    },
    {
      maintitle: "Code of Conduct",
      subtitle: [
        "Act with integrity and professionalism",
        "Comply with laws, regulations, and policies",
        "Maintain confidentiality and protect sensitive information",
        "Treat others with respect and fairness",
        "Avoid conflicts of interest"
      ]
    },
    {
      maintitle: "Ethics",
      subtitle: [
        "Honesty and transparency in all dealings",
        "Accountability for actions and decisions",
        "Fairness and impartiality in business practices",
        "Respect for individuals and communities",
        "Continuous improvement and striving for excellence"
      ]
    },
    {
      maintitle: "Profit Distribution",
      text: "Profits will be distributed to investors according to the company's policy and the specific terms of each project."
    },
    {
      maintitle: "Withdrawal Policy",
      subtitle: [
        "Gold Trading: Withdrawals will be processed after 15 days of investment.",
        "Other Businesses: Withdrawals will be processed after 1 month (30 days) of investment.",
        "Other Terms: Withdrawals for other projects or investments will be processed according to the company's policy and the specific terms of the investment.",
        "Withdrawal Processing: Once the minimum holding period has been met, withdrawal requests will be processed and funds will be received within 24 hours."
      ]
    },
    {
      maintitle: "Capital Protection and Risk Management",
      text: "At Overland Solution, we prioritize the security of your capital. In the event of unforeseen losses, while we cannot guarantee absolute protection against all market fluctuations, we commit to safeguarding your initial investment to the fullest extent possible under our management."
    },
    {
      maintitle: "Profit and Loss Management",
      subtitle: [
        "Capital Guarantee: Your initial capital investment is our priority, and we strive to ensure its safety through careful management and risk assessment.",
        "Profit and Loss: While we aim for profitable returns, if any project incurs losses, we will work to limit the impact on your profits. Our goal is to maximize returns while managing risks responsibly."
      ]
    },
    {
      maintitle: "Communication",
      subtitle: [
        "Regular updates on investment performance and project progress",
        "Timely notifications for important events or changes",
        "Multiple channels for communication (email, phone, online portal)"
      ]
    },
    {
      maintitle: "Support",
      subtitle: [
        "Dedicated support team available to address queries and concerns",
        "Prompt response to investor inquiries",
        "Assistance with investment-related matters"
      ]
    },
    {
      maintitle: "Breach",
      subtitle: [
        "Failure to comply with terms and conditions",
        "Non-payment or delayed payment",
        "Misrepresentation or misconduct"
      ]
    },
    {
      maintitle: "Termination",
      subtitle: [
        "Grounds for termination: breach of agreement, non-compliance, or other specified events",
        "Notice period and procedure for termination",
        "Consequences of termination, including potential penalties or losses"
      ]
    },
    {
      maintitle: "Consequences",
      subtitle: [
        "Investors may lose benefits or returns",
        "Termination fees may apply",
        "Potential impact on future investments"
      ]
    },
    {
      maintitle: "Terms and Conditions",
      subtitle: [
        "By engaging with Overland Solution, you acknowledge that you have read, understood, and agreed to our terms and conditions.",
        "Our services include investment opportunities, gold trading, and financial services, which carry inherent risks, including market volatility and potential losses.",
        "You are responsible for providing accurate and complete information, complying with applicable laws and regulations, and making informed decisions based on our guidance.",
        "We maintain confidentiality and protect your personal and financial information in accordance with industry standards and regulatory requirements.",
        "Our team, including our think tank, adheres to strict confidentiality protocols to ensure your information remains secure.",
        "We are not liable for losses or damages resulting from market fluctuations, unforeseen circumstances, or any other factors beyond our control.",
        "You understand that investments can result in gains or losses, and you accept these risks.",
        "Either party can terminate our agreement with written notice, specifying the effective date of termination.",
        "Upon termination, we will take reasonable steps to ensure a smooth transition of your investments and provide any necessary support.",
        "These terms and conditions are governed by applicable law, and any disputes or claims arising from our relationship will be resolved in accordance with the laws of [jurisdiction].",
        "We reserve the right to modify these terms and conditions at any time, with or without notice.",
        "You are responsible for regularly reviewing our terms and conditions to ensure you are aware of any changes.",
        "Our services are provided on an 'as is' basis, and we make no warranties, express or implied, regarding their performance or suitability for your needs."
      ]
    }
  ];
  return (
    <>
    <div className="bg-gradient-to-r from-black via-blue-950 to-black space-y-8">
      <h1 className="text-center font-poppins text-4xl text-white font-bold">
        <span className="text-blue-600 font-extrabold">Overland Solutions</span> – Company Policy
      </h1>
      <ul className="space-y-6 relative">
        {policies.map((element) => (
          <>
          <div className="space-y-2">
            <li className=" text-2xl font-poppins text-white font-semibold">{element.maintitle}

              <ul className="list-disc px-5 space-y-2 mt-2">
                {
                  element.subtitle?.map((sub=>(<>
                  <li className="font-normal text-base text-gray-300">
                    {
                      sub
                    }
                  </li>
                  </>)))
                }
              </ul>
            </li>
            {
              element.text && <>
              <p className="font-poppins text-gray-300">{element.text}</p>
              </>
            }
            </div>
          </>
        ))}
      </ul>
      </div>
    </>
  );
};

export default Policy;
