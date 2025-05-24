import React from "react";

const Policy = () => {
  const policies = [
    {
      maintitle: "Company Mission Statement",
      text: "At Overland Solutions, our mission is to empower global investors by providing secure, transparent, and performance-driven trading services, supported by cutting-edge technology and strategic partnerships like Royal Vision Global Partner.",
    },
    {
      maintitle: "Core Values",
      subtitle: [
        "Transparency: Clear, honest, and open communication.",
        "Integrity: Ethical conduct in every trade and partnership.",
        "Client-Centricity: Client success is our priority.",
        "Innovation: Continuous improvement and adoption of new technologies.",
        "Compliance: Strict adherence to regulatory and legal obligations.",
      ],
    },
    {
      maintitle: "rading Ethics & Code of Conduct",
      subtitle: [
        "All traders must maintain confidentiality and protect client data.",
        "Use only company-approved tools, platforms, and strategies.",
        "No insider trading or market manipulation will be tolerated.",
        "Traders must adhere to risk management guidelines set forth by the compliance team.",
        "All trade records must be logged and auditable.",
      ],
    },
    {
      maintitle: "Profit Distribution & Withdrawals",
      subtitle: [
        "Profits will be distributed monthly, after audit clearance.",
        "Withdrawals may take up to 3-5 business days depending on the payment channel.",
        "Clients are required to provide updated payment credentials to avoid delays.",
      ],
    },
    {
      maintitle: "Risk Disclosure",
      text: "Overland Solutions educates clients on the high-risk nature of forex and crypto trading. Clients must read and sign the Risk Disclosure Agreement before trading. We do not promise guaranteed returns.",
    },
    {
      maintitle: "Communication & Support",
      subtitle:[
        "We provide 24/5 customer support via email, chat, and phone.",
        "Clients must avoid communicating with unauthorized personnel claiming to represent Overland Solutions or Royal Vision."
      ]
    },
    {
      maintitle: "Breach & Termination",
      subtitle:[
        "Any violation of this policy may result in suspension or termination of employment or partnership.",
        "Disputes will be addressed through legal arbitration under local law."
      ]
    },
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
