import React from 'react'
import blog from '../../../public/assests/blog1.jpg'

const contentData = [
    {
        title: "Introduction",
        image1: blog,
        content1:
            " Grab our On-demand Pizza Ordering system and turn more pizza lovers into loyal customers. From managing orders to menu and deliveries- you will get a complete suite of features to start your online Pizza delivery business within an hour!",
    },
    {

        title2: "Features Overview",
        content2:
            "The Impressive Store App to run and manage your pizza delivery business seamlessly with the right technology and features.",
        panel: [{


            title: "Store Panel",
            image2:blog,
            keypoints: [{
                keytitle: "login",
                keydetail: "Sign up and log in to the Takeaway Delivery System with an email or social credentials."
            }
            ],
        }
        ],
    },
    {

        title3: "Delivery Options",
        content3: "With the online ordering system for takeaway, restaurant owners can offer three different types of takeaway deliveries:",
        image3: blog,
        points: [{
            pointtitle: "hello",
            pointdetail: "helllo"
        }],
    },
  {
   faqs :{
          title: "FAQs For Online Takeaway Ordering System",
          questions: [
              {
                  "question": "What is a restaurant takeaway system?",
                  "answer": "A restaurant takeaway system is an online ordering process that enables customers to pick up their food parcels on their own. Customers receive the notification for pickup once the order is ready."
                }
            ]
        },
    }
]

export default function SystemApp() {
    return (
        <div>
             <div className="container mx-auto p-4">
      {contentData.map((section, index) => (
        <div key={index} className="section mb-8">
          {section.title && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
              {section.image1 && <img src={section.image1} alt={section.title} className="w-full h-auto mb-2" />}
              <p className="text-lg">{section.content1}</p>
            </div>
          )}
          
          {section.title2 && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{section.title2}</h2>
              <p className="text-lg">{section.content2}</p>
              {section.panel && section.panel.map((panel, idx) => (
                <div key={idx} className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">{panel.title}</h3>
                  {panel.image2 && <img src={panel.image2} alt={panel.title} className="w-full h-auto mb-2" />}
                  {panel.keypoints && panel.keypoints.map((keypoint, kIdx) => (
                    <div key={kIdx} className="bg-gray-100 p-4 rounded mb-2">
                      <h4 className="font-semibold">{keypoint.keytitle}</h4>
                      <p>{keypoint.keydetail}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          
          {section.title3 && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{section.title3}</h2>
              {section.image3 && <img src={section.image3} alt={section.title3} className="w-full h-auto mb-2" />}
              <p className="text-lg mb-2">{section.content3}</p>
              {section.points && section.points.map((point, pIdx) => (
                <div key={pIdx} className="mb-2">
                  <h4 className="text-lg font-semibold">{point.pointtitle}</h4>
                  <p>{point.pointdetail}</p>
                </div>
              ))}
            </div>
          )}

          {section.faqs && (
            <div className="faq">
              <h2 className="text-2xl font-bold mb-4">{section.faqs.title}</h2>
              {section.faqs.questions && section.faqs.questions.map((faq, fIdx) => (
                <div key={fIdx} className="mb-4">
                  <p className="font-semibold">{faq.question}</p>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
        </div>
    )
}


