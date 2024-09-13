// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminContentForm = () => {
//     const [formData, setFormData] = useState({
//         title: "",
//         image1: null,
//         content1: "",
//         title2: "",
//         content2: "",
//         panel: [
//             {
//                 title: "",
//                 desc: "",
//                 image: null,
//                 keypoints: [{ keytitle: "", keydetail: "" }]
//             }
//         ],
//         faqs: {
//             title: "",
//             description: "",
//             questions: [{ question: "", answer: "" }]
//         }
//     });

//     const [systems, setSystems] = useState([]);
//     const [selectedSystemSlug, setSelectedSystemSlug] = useState("");

//     // Fetch all systems for dropdown
//     useEffect(() => {
//         axios.get('http://localhost:5001/api/systems/')
//             .then((res) => {
//                 if (Array.isArray(res.data)) {
//                     setSystems(res.data);
//                 } else {
//                     setSystems([]);
//                 }
//             })
//             .catch(() => {
//                 setSystems([]);
//             });
//     }, []);

//     // Fetch content when a system is selected
//     useEffect(() => {
//         if (selectedSystemSlug) {
//             axios.get(`http://localhost:5001/api/content/system/${selectedSystemSlug}`)
//                 .then((res) => {
//                     if (res.data && typeof res.data === 'object') {
//                         setFormData(res.data);
//                     } else {
//                         resetForm();
//                     }
//                 })
//                 .catch(() => {
//                     resetForm();
//                 });
//         } else {
//             resetForm();
//         }
//     }, [selectedSystemSlug]);

//     const resetForm = () => {
//         setFormData({
//             title: "",
//             image1: null,
//             content1: "",
//             title2: "",
//             content2: "",
//             panel: [{ title: "", desc: "", image: null, keypoints: [{ keytitle: "", keydetail: "" }] }],
//             faqs: { title: "", description: "", questions: [{ question: "", answer: "" }] }
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (e) => {
//         const { name } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: e.target.files[0]
//         }));
//     };

//     const handlePanelChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedPanels = [...formData.panel];
//         updatedPanels[index][name] = value;
//         setFormData((prevState) => ({
//             ...prevState,
//             panel: updatedPanels
//         }));
//     };

//     const handleKeypointChange = (panelIndex, keypointIndex, e) => {
//         const { name, value } = e.target;
//         const updatedPanels = [...formData.panel];
//         updatedPanels[panelIndex].keypoints[keypointIndex][name] = value;
//         setFormData((prevState) => ({
//             ...prevState,
//             panel: updatedPanels
//         }));
//     };

//     const addPanel = () => {
//         setFormData((prevState) => ({
//             ...prevState,
//             panel: [...prevState.panel, { title: "", desc: "", image: null, keypoints: [{ keytitle: "", keydetail: "" }] }]
//         }));
//     };

//     const addKeypoint = (panelIndex) => {
//         const updatedPanels = [...formData.panel];
//         updatedPanels[panelIndex].keypoints.push({ keytitle: "", keydetail: "" });
//         setFormData((prevState) => ({
//             ...prevState,
//             panel: updatedPanels
//         }));
//     };

//     const addFaq = () => {
//         const updatedQuestions = [...formData.faqs.questions];
//         updatedQuestions.push({ question: "", answer: "" });
//         setFormData((prevState) => ({
//             ...prevState,
//             faqs: {
//                 ...prevState.faqs,
//                 questions: updatedQuestions
//             }
//         }));
//     };

//     const handleSystemChange = (e) => {
//         setSelectedSystemSlug(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formDataToSend = new FormData();
//         formDataToSend.append("title", formData.title);
//         formDataToSend.append("image1", formData.image1);
//         formDataToSend.append("content1", formData.content1);
//         formDataToSend.append("title2", formData.title2);
//         formDataToSend.append("content2", formData.content2);

//         formData.panel.forEach((panel, panelIndex) => {
//             formDataToSend.append(`panel[${panelIndex}][title]`, panel.title);
//             formDataToSend.append(`panel[${panelIndex}][desc]`, panel.desc);
//             formDataToSend.append(`panel[${panelIndex}][image]`, panel.image);

//             panel.keypoints.forEach((keypoint, keypointIndex) => {
//                 formDataToSend.append(`panel[${panelIndex}][keypoints][${keypointIndex}][keytitle]`, keypoint.keytitle);
//                 formDataToSend.append(`panel[${panelIndex}][keypoints][${keypointIndex}][keydetail]`, keypoint.keydetail);
//             });
//         });

//         formDataToSend.append("faqs[title]", formData.faqs.title);
//         formDataToSend.append("faqs[description]", formData.faqs.description);
//         formData.faqs.questions.forEach((faq, faqIndex) => {
//             formDataToSend.append(`faqs[questions][${faqIndex}][question]`, faq.question);
//             formDataToSend.append(`faqs[questions][${faqIndex}][answer]`, faq.answer);
//         });

//         // Always use POST to add new content
//         axios.post(`http://localhost:5001/api/content/system/${selectedSystemSlug}`, formDataToSend)
//             .then(() => {
//                 alert("Content added successfully!");
//                 resetForm();
//                 setSelectedSystemSlug("");
//             })
//             .catch((err) => console.error("Failed to add content", err));
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
//             <h2 className="text-2xl font-bold mb-6">Add Content</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* System Selector */}
//                 <div>
//                     <label className="block text-sm font-medium">Select System</label>
//                     <select
//                         value={selectedSystemSlug}
//                         onChange={handleSystemChange}
//                         className="mt-1 block w-full p-2 border rounded-md"
//                     >
//                         <option value="">Select a system</option>
//                         {systems?.map((system) => (
//                             <option key={system.slug} value={system.slug}>
//                                 {system.title}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Title */}
//                 <div>
//                     <label className="block text-sm font-medium">Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={formData.title || ""}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full p-2 border rounded-md"
//                         placeholder="Enter the title"
//                     />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                     <label className="block text-sm font-medium">Image Upload</label>
//                     <input
//                         type="file"
//                         name="image1"
//                         onChange={handleFileChange}
//                         className="mt-1 block w-full p-2 border rounded-md"
//                     />
//                 </div>

//                 {/* Content */}
//                 <div>
//                     <label className="block text-sm font-medium">Content 1</label>
//                     <textarea
//                         name="content1"
//                         value={formData.content1 || ""}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full p-2 border rounded-md"
//                         rows="2"
//                         placeholder="Enter the content"
//                     />
//                 </div>

//                 {/* Title2 and Content2 */}
//                 <div>
//                     <label className="block text-sm font-medium">Title 2</label>
//                     <input
//                         type="text"
//                         name="title2"
//                         value={formData.title2 || ""}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full p-2 border rounded-md"
//                         placeholder="Enter the title 2"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium">Content 2</label>
//                     <textarea
//                         name="content2"
//                         value={formData.content2 || ""}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full p-2 border rounded-md"
//                         rows="2"
//                         placeholder="Enter the content 2"
//                     />
//                 </div>

//                 {/* Panels */}
//                 <div>
//                     <h3 className="text-xl font-bold">Panels</h3>
//                     {formData.panel?.map((panel, panelIndex) => (
//                         <div key={panelIndex} className="border-t border-gray-200 pt-4">
//                             <div>
//                                 <label className="block text-sm font-medium">Panel Title</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={panel.title}
//                                     onChange={(e) => handlePanelChange(panelIndex, e)}
//                                     className="mt-1 block w-full p-2 border rounded-md"
//                                     placeholder="Enter panel title"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium">Panel Description</label>
//                                 <textarea
//                                     name="desc"
//                                     value={panel.desc}
//                                     onChange={(e) => handlePanelChange(panelIndex, e)}
//                                     className="mt-1 block w-full p-2 border rounded-md"
//                                     rows="2"
//                                     placeholder="Enter panel description"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium">Panel Image</label>
//                                 <input
//                                     type="file"
//                                     name="image"
//                                     onChange={(e) => handleFileChange(e)}
//                                     className="mt-1 block w-full p-2 border rounded-md"
//                                 />
//                             </div>

//                             {/* Keypoints */}
//                             <div>
//                                 <h4 className="text-lg font-semibold">Keypoints</h4>
//                                 {panel.keypoints?.map((keypoint, keypointIndex) => (
//                                     <div key={keypointIndex} className="border-t border-gray-200 pt-4">
//                                         <div>
//                                             <label className="block text-sm font-medium">Keypoint Title</label>
//                                             <input
//                                                 type="text"
//                                                 name="keytitle"
//                                                 value={keypoint.keytitle}
//                                                 onChange={(e) => handleKeypointChange(panelIndex, keypointIndex, e)}
//                                                 className="mt-1 block w-full p-2 border rounded-md"
//                                                 placeholder="Enter keypoint title"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium">Keypoint Detail</label>
//                                             <textarea
//                                                 name="keydetail"
//                                                 value={keypoint.keydetail}
//                                                 onChange={(e) => handleKeypointChange(panelIndex, keypointIndex, e)}
//                                                 className="mt-1 block w-full p-2 border rounded-md"
//                                                 rows="2"
//                                                 placeholder="Enter keypoint detail"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <button type="button" onClick={() => addKeypoint(panelIndex)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
//                                     Add Keypoint
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                     <button type="button" onClick={addPanel} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
//                         Add Panel
//                     </button>
//                 </div>

//                 {/* FAQs */}
//                 <div>
//                     <h3 className="text-xl font-bold">FAQs</h3>
//                     <div>
//                         <label className="block text-sm font-medium">FAQs Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.faqs?.title}
//                             onChange={(e) => setFormData((prevState) => ({
//                                 ...prevState,
//                                 faqs: {
//                                     ...prevState.faqs,
//                                     title: e.target.value
//                                 }
//                             }))}
//                             className="mt-1 block w-full p-2 border rounded-md"
//                             placeholder="Enter FAQs title"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium">FAQs Description</label>
//                         <textarea
//                             name="description"
//                             value={formData?.faqs?.description}
//                             onChange={(e) => setFormData((prevState) => ({
//                                 ...prevState,
//                                 faqs: {
//                                     ...prevState.faqs,
//                                     description: e.target.value
//                                 }
//                             }))}
//                             className="mt-1 block w-full p-2 border rounded-md"
//                             rows="2"
//                             placeholder="Enter FAQs description"
//                         />
//                     </div>

//                     {formData.faqs?.questions?.map((faq, index) => (
//                         <div key={index} className="border-t border-gray-200 pt-4">
//                             <div>
//                                 <label className="block text-sm font-medium">Question</label>
//                                 <input
//                                     type="text"
//                                     name="question"
//                                     value={faq?.question}
//                                     onChange={(e) => {
//                                         const updatedQuestions = [...formData.faqs.questions];
//                                         updatedQuestions[index].question = e.target.value;
//                                         setFormData((prevState) => ({
//                                             ...prevState,
//                                             faqs: {
//                                                 ...prevState.faqs,
//                                                 questions: updatedQuestions
//                                             }
//                                         }));
//                                     }}
//                                     className="mt-1 block w-full p-2 border rounded-md"
//                                     placeholder="Enter the question"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium">Answer</label>
//                                 <textarea
//                                     name="answer"
//                                     value={faq.answer}
//                                     onChange={(e) => {
//                                         const updatedQuestions = [...formData.faqs.questions];
//                                         updatedQuestions[index].answer = e.target.value;
//                                         setFormData((prevState) => ({
//                                             ...prevState,
//                                             faqs: {
//                                                 ...prevState.faqs,
//                                                 questions: updatedQuestions
//                                             }
//                                         }));
//                                     }}
//                                     className="mt-1 block w-full p-2 border rounded-md"
//                                     rows="2"
//                                     placeholder="Enter the answer"
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     <button type="button" onClick={addFaq} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
//                         Add FAQ
//                     </button>
//                 </div>

//                 <div>
//                     <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
//                         Submit
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdminContentForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContentForm = ({ contentId }) => {
  const [content, setContent] = useState({
    title: '',
    image1: null,
    content1: '',
    title2: '',
    content2: '',
    panel: [{ title: '', desc: '', image: null, keypoints: [{ keytitle: '', keydetail: '' }] }],
    title3: '',
    title4: '',
    faqs: { title: '', description: '', questions: [{ question: '', answer: '' }] },
    system: '',
  });

  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [fileUrl, setFileUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetchSystems();
  }, []);

  useEffect(() => {
    if (contentId) {
      fetchContent(contentId);
    }
  }, [contentId]);

  const fetchSystems = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/systems');
      setSystems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContent = async (systemId) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/api/contentdetail/${systemId}`);
  
      // Assuming res.data is the JSON response
      if (res.data) {
        // Check if the response has a message indicating no content found
        if (res.data.message && res.data.message === 'No content found for this system') {
          setContent({
            title: '',
            image1: null,
            content1: '',
            title2: '',
            content2: '',
            panel: [{ title: '', desc: '', image: null, keypoints: [{ keytitle: '', keydetail: '' }] }],
            title3: '',
            title4: '',
            faqs: { title: '', description: '', questions: [{ question: '', answer: '' }] },
            system: content.system,
          });
        } else {
          // Set content if data is found
          setContent(res.data);
        }
      } else {
        // Handle the case where no data is returned but status is 200
        setContent({
          title: '',
          image1: null,
          content1: '',
          title2: '',
          content2: '',
          panel: [{ title: '', desc: '', image: null, keypoints: [{ keytitle: '', keydetail: '' }] }],
          title3: '',
          title4: '',
          faqs: { title: '', description: '', questions: [{ question: '', answer: '' }] },
          system: content.system,
        });
      }
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    if (content.system) {
      fetchContent(content.system);
    } else {
      setContent({
        title: '',
        image1: null,
        content1: '',
        title2: '',
        content2: '',
        panel: [{ title: '', desc: '', image: null, keypoints: [{ keytitle: '', keydetail: '' }] }],
        title3: '',
        title4: '',
        faqs: { title: '', description: '', questions: [{ question: '', answer: '' }] },
        system: content.system,
      });
    }
  }, [content.system]);


  const handleInputChange = (e, field) => {
    setContent({ ...content, [field]: e.target.value });
  };

  const handleImageChange = (e, field) => {
    setContent({ ...content, [field]: e.target.files[0] });
  };

  const handlePanelChange = (index, field, value) => {
    const updatedPanel = [...content.panel];
    updatedPanel[index][field] = value;
    setContent({ ...content, panel: updatedPanel });
  };

  const handlePanelImageChange = (index, e) => {
    const updatedPanel = [...content.panel];
    updatedPanel[index].image = e.target.files[0];
    setContent({ ...content, panel: updatedPanel });
  };

  const handleAddPanel = () => {
    setContent({
      ...content,
      panel: [...content.panel, { title: '', desc: '', image: null, keypoints: [{ keytitle: '', keydetail: '' }] }],
    });
  };

  const handleRemovePanel = async (index) => {
    if (contentId && content.panel[index]._id) {
      try {
        await axios.delete(`http://localhost:5001/api/content/${contentId}/panel/${content.panel[index]._id}`);
      } catch (err) {
        console.error(err);
        return;
      }
    }
    const updatedPanel = [...content.panel];
    updatedPanel.splice(index, 1);
    setContent({ ...content, panel: updatedPanel });
  };

  const handleAddKeypoint = (panelIndex) => {
    const updatedPanel = [...content.panel];
    updatedPanel[panelIndex].keypoints.push({ keytitle: '', keydetail: '' });
    setContent({ ...content, panel: updatedPanel });
  };

  const handleRemoveKeypoint = async (panelIndex, keypointIndex) => {
    if (contentId && content.panel[panelIndex].keypoints[keypointIndex]._id) {
      try {
        await axios.delete(`http://localhost:5001/api/content/${contentId}/panel/${content.panel[panelIndex]._id}/keypoint/${content.panel[panelIndex].keypoints[keypointIndex]._id}`);
      } catch (err) {
        console.error(err);
        return;
      }
    }
    const updatedPanel = [...content.panel];
    updatedPanel[panelIndex].keypoints.splice(keypointIndex, 1);
    setContent({ ...content, panel: updatedPanel });
  };

  const handleFaqChange = (index, field, value) => {
    const updatedQuestions = [...content.faqs.questions];
    updatedQuestions[index][field] = value;
    setContent({
      ...content,
      faqs: { ...content.faqs, questions: updatedQuestions },
    });
  };

  const handleAddQuestion = () => {
    setContent({
      ...content,
      faqs: { ...content.faqs, questions: [...content.faqs.questions, { question: '', answer: '' }] },
    });
  };

  const handleRemoveQuestion = async (index) => {
    if (contentId && content.faqs.questions[index]._id) {
      try {
        await axios.delete(`http://localhost:5001/api/content/${contentId}/faq/${content.faqs.questions[index]._id}`);
      } catch (err) {
        console.error(err);
        return;
      }
    }
    const updatedQuestions = [...content.faqs.questions];
    updatedQuestions.splice(index, 1);
    setContent({
      ...content,
      faqs: { ...content.faqs, questions: updatedQuestions },
    });
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();

    // Append text fields
    formData.append('title', content.title);
    formData.append('content1', content.content1);
    formData.append('title2', content.title2);
    formData.append('content2', content.content2);
    formData.append('title3', content.title3);
    formData.append('title4', content.title4);
    formData.append('faqs', JSON.stringify(content.faqs));
    formData.append('system', content.system);

    // Append image1
    if (content.image1) {
      formData.append('image1', content.image1);
    }

    // Append panel data and images
    const panelData = content.panel.map(panel => {
      const { image, ...rest } = panel;
      return rest;
    });
    formData.append('panel', JSON.stringify(panelData));

    content.panel.forEach((panel, index) => {
      if (panel.image) {
        formData.append(`panelImage${index}`, panel.image);
      }
    });

    try {
      const apiUrl = contentId
        ? `http://localhost:5001/api/content/${contentId}`
        : 'http://localhost:5001/api/content';
      const apiMethod = contentId ? axios.put : axios.post;

      const response = await apiMethod(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`Content ${contentId ? 'updated' : 'created'} successfully!`);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while saving the content.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">{contentId ? 'Update Content' : 'Create Content'}</h2>

      {/* System Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Select System</label>
        <select
          value={content.system}
          onChange={(e) => handleInputChange(e, 'system')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a system</option>
          {systems.map(system => (
            <option key={system._id} value={system._id}>
              {system.title}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => handleInputChange(e, 'title')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
        />
      </div>

      {/* Image 1 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Image 1</label>
        <input
          type="file"
          onChange={(e) => handleImageChange(e, 'image1')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept="image/*"
        />
        {content.image1 && (
          <img src={`http://localhost:5001/${content.image1}`} alt="Preview" className="mt-2 max-w-xs" />
        )}
      </div>

      {/* Content 1 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content 1</label>
        <textarea
          value={content.content1}
          onChange={(e) => handleInputChange(e, 'content1')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Content 1"
        ></textarea>
      </div>

      {/* Title 2 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title 2</label>
        <input
          type="text"
          value={content.title2}
          onChange={(e) => handleInputChange(e, 'title2')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title 2"
        />
      </div>

      {/* Content 2 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Content 2</label>
        <textarea
          value={content.content2}
          onChange={(e) => handleInputChange(e, 'content2')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Content 2"
        ></textarea>
      </div>

      {/* Title 3 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title 3</label>
        <input
          type="text"
          value={content.title3}
          onChange={(e) => handleInputChange(e, 'title3')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title 3"
        />
      </div>

      {/* Title 4 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title 4</label>
        <input
          type="text"
          value={content.title4}
          onChange={(e) => handleInputChange(e, 'title4')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title 4"
        />
      </div>

      {/* Panels */}
      <h3 className="text-xl font-semibold mb-4">Panels</h3>
      {content.panel.map((panel, panelIndex) => (
        <div key={panelIndex} className="mb-4 p-4 bg-white shadow-md rounded-lg">
          {/* Panel Title */}
          <label className="block text-gray-700 font-semibold mb-2">Panel Title</label>
          <input
            type="text"
            value={panel.title}
            onChange={(e) => handlePanelChange(panelIndex, 'title', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Panel Title"
          />

          {/* Panel Description */}
          <label className="block text-gray-700 font-semibold mb-2">Panel Description</label>
          <textarea
            value={panel.desc}
            onChange={(e) => handlePanelChange(panelIndex, 'desc', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Panel Description"
          ></textarea>

          {/* Panel Image */}
          <label className="block text-gray-700 font-semibold mb-2">Panel Image</label>
          <input
            type="file"
            onChange={(e) => handlePanelImageChange(panelIndex, e)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
    {panel.image && (
  <img src={`http://localhost:5001/${panel.image}`} alt="Preview" className="mt-2 max-w-xs" />
)}

          {/* Keypoints */}
          <h4 className="text-lg font-semibold mt-4">Keypoints</h4>
          {panel.keypoints.map((keypoint, keypointIndex) => (
            <div key={keypointIndex} className="mb-2 p-2 bg-gray-100 rounded-lg">
              {/* Keypoint Title */}
              <label className="block text-gray-700 font-semibold mb-1">Keypoint Title</label>
              <input
                type="text"
                value={keypoint.keytitle}
                onChange={(e) => {
                  const updatedPanel = [...content.panel];
                  updatedPanel[panelIndex].keypoints[keypointIndex].keytitle = e.target.value;
                  setContent({ ...content, panel: updatedPanel });
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Keypoint Title"
              />

              {/* Keypoint Detail */}
              <label className="block text-gray-700 font-semibold mb-1">Keypoint Detail</label>
              <textarea
                value={keypoint.keydetail}
                onChange={(e) => {
                  const updatedPanel = [...content.panel];
                  updatedPanel[panelIndex].keypoints[keypointIndex].keydetail = e.target.value;
                  setContent({ ...content, panel: updatedPanel });
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Keypoint Detail"
              ></textarea>

              {/* Remove Keypoint Button */}
              <button
                onClick={() => handleRemoveKeypoint(panelIndex, keypointIndex)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg focus:outline-none hover:bg-red-700"
              >
                Remove Keypoint
              </button>
            </div>
          ))}

          {/* Add Keypoint Button */}
          <button
            onClick={() => handleAddKeypoint(panelIndex)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-700"
          >
            Add Keypoint
          </button>

          {/* Remove Panel Button */}
          <button
            onClick={() => handleRemovePanel(panelIndex)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg focus:outline-none hover:bg-red-700"
          >
            Remove Panel
          </button>
        </div>
      ))}

      {/* Add Panel Button */}
      <button
        onClick={handleAddPanel}
        className="px-3 py-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-700"
      >
        Add Panel
      </button>

      {/* FAQs */}
      <h3 className="text-xl font-semibold mb-4">FAQs</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">FAQ Title</label>
        <input
          type="text"
          value={content.faqs.title}
          onChange={(e) => setContent({ ...content, faqs: { ...content.faqs, title: e.target.value } })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="FAQ Title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">FAQ Description</label>
        <textarea
          value={content.faqs.description}
          onChange={(e) => setContent({ ...content, faqs: { ...content.faqs, description: e.target.value } })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="FAQ Description"
        ></textarea>
      </div>


      {content.faqs.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-4 bg-white shadow-md rounded-lg">
          <label className="block text-gray-700 font-semibold mb-2">Question</label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleFaqChange(qIndex, 'question', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="FAQ Question"
          />

          <label className="block text-gray-700 font-semibold mb-2">Answer</label>
          <textarea
            value={question.answer}
            onChange={(e) => handleFaqChange(qIndex, 'answer', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="FAQ Answer"
          ></textarea>

          <button onClick={() => handleRemoveQuestion(qIndex)} className="mt-2 text-red-500">
            Remove Question
          </button>
        </div>
      ))}
      <button onClick={handleAddQuestion} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
        Add Question
      </button>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? 'Saving...' : (contentId ? 'Update Content' : 'Save Content')}
      </button>
    </div>
  )
}

export default AdminContentForm;