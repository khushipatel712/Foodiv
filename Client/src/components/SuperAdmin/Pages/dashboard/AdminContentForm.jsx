import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminContentForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        image1: null,
        content1: "",
        title2: "",
        content2: "",
        panel: [
            {
                title: "",
                desc: "",
                image: null,
                keypoints: [{ keytitle: "", keydetail: "" }]
            }
        ],
        faqs: {
            title: "",
            description: "",
            questions: [{ question: "", answer: "" }]
        }
    });

    const [systems, setSystems] = useState([]);
    const [selectedSystemSlug, setSelectedSystemSlug] = useState("");

    // Fetch all systems for dropdown
    useEffect(() => {
        axios.get('http://localhost:5001/api/systems/')
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setSystems(res.data);
                } else {
                    setSystems([]);
                }
            })
            .catch(() => {
                setSystems([]);
            });
    }, []);

    // Fetch content when a system is selected
    useEffect(() => {
        if (selectedSystemSlug) {
            axios.get(`http://localhost:5001/api/content/system/${selectedSystemSlug}`)
                .then((res) => {
                    if (res.data && typeof res.data === 'object') {
                        setFormData(res.data);
                    } else {
                        resetForm();
                    }
                })
                .catch(() => {
                    resetForm();
                });
        } else {
            resetForm();
        }
    }, [selectedSystemSlug]);

    const resetForm = () => {
        setFormData({
            title: "",
            image1: null,
            content1: "",
            title2: "",
            content2: "",
            panel: [{ title: "", desc: "", image: null, keypoints: [{ keytitle: "", keydetail: "" }] }],
            faqs: { title: "", description: "", questions: [{ question: "", answer: "" }] }
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.files[0]
        }));
    };

    const handlePanelChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPanels = [...formData.panel];
        updatedPanels[index][name] = value;
        setFormData((prevState) => ({
            ...prevState,
            panel: updatedPanels
        }));
    };

    const handleKeypointChange = (panelIndex, keypointIndex, e) => {
        const { name, value } = e.target;
        const updatedPanels = [...formData.panel];
        updatedPanels[panelIndex].keypoints[keypointIndex][name] = value;
        setFormData((prevState) => ({
            ...prevState,
            panel: updatedPanels
        }));
    };

    const addPanel = () => {
        setFormData((prevState) => ({
            ...prevState,
            panel: [...prevState.panel, { title: "", desc: "", image: null, keypoints: [{ keytitle: "", keydetail: "" }] }]
        }));
    };

    const addKeypoint = (panelIndex) => {
        const updatedPanels = [...formData.panel];
        updatedPanels[panelIndex].keypoints.push({ keytitle: "", keydetail: "" });
        setFormData((prevState) => ({
            ...prevState,
            panel: updatedPanels
        }));
    };

    const addFaq = () => {
        const updatedQuestions = [...formData.faqs.questions];
        updatedQuestions.push({ question: "", answer: "" });
        setFormData((prevState) => ({
            ...prevState,
            faqs: {
                ...prevState.faqs,
                questions: updatedQuestions
            }
        }));
    };

    const handleSystemChange = (e) => {
        setSelectedSystemSlug(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("image1", formData.image1);
        formDataToSend.append("content1", formData.content1);
        formDataToSend.append("title2", formData.title2);
        formDataToSend.append("content2", formData.content2);

        formData.panel.forEach((panel, panelIndex) => {
            formDataToSend.append(`panel[${panelIndex}][title]`, panel.title);
            formDataToSend.append(`panel[${panelIndex}][desc]`, panel.desc);
            formDataToSend.append(`panel[${panelIndex}][image]`, panel.image);

            panel.keypoints.forEach((keypoint, keypointIndex) => {
                formDataToSend.append(`panel[${panelIndex}][keypoints][${keypointIndex}][keytitle]`, keypoint.keytitle);
                formDataToSend.append(`panel[${panelIndex}][keypoints][${keypointIndex}][keydetail]`, keypoint.keydetail);
            });
        });

        formDataToSend.append("faqs[title]", formData.faqs.title);
        formDataToSend.append("faqs[description]", formData.faqs.description);
        formData.faqs.questions.forEach((faq, faqIndex) => {
            formDataToSend.append(`faqs[questions][${faqIndex}][question]`, faq.question);
            formDataToSend.append(`faqs[questions][${faqIndex}][answer]`, faq.answer);
        });

        // Always use POST to add new content
        axios.post(`http://localhost:5001/api/content/system/${selectedSystemSlug}`, formDataToSend)
            .then(() => {
                alert("Content added successfully!");
                resetForm();
                setSelectedSystemSlug("");
            })
            .catch((err) => console.error("Failed to add content", err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Add Content</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* System Selector */}
                <div>
                    <label className="block text-sm font-medium">Select System</label>
                    <select
                        value={selectedSystemSlug}
                        onChange={handleSystemChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                    >
                        <option value="">Select a system</option>
                        {systems?.map((system) => (
                            <option key={system.slug} value={system.slug}>
                                {system.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter the title"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium">Image Upload</label>
                    <input
                        type="file"
                        name="image1"
                        onChange={handleFileChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium">Content 1</label>
                    <textarea
                        name="content1"
                        value={formData.content1 || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        rows="2"
                        placeholder="Enter the content"
                    />
                </div>

                {/* Title2 and Content2 */}
                <div>
                    <label className="block text-sm font-medium">Title 2</label>
                    <input
                        type="text"
                        name="title2"
                        value={formData.title2 || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter the title 2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Content 2</label>
                    <textarea
                        name="content2"
                        value={formData.content2 || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        rows="2"
                        placeholder="Enter the content 2"
                    />
                </div>

                {/* Panels */}
                <div>
                    <h3 className="text-xl font-bold">Panels</h3>
                    {formData.panel?.map((panel, panelIndex) => (
                        <div key={panelIndex} className="border-t border-gray-200 pt-4">
                            <div>
                                <label className="block text-sm font-medium">Panel Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={panel.title}
                                    onChange={(e) => handlePanelChange(panelIndex, e)}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    placeholder="Enter panel title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Panel Description</label>
                                <textarea
                                    name="desc"
                                    value={panel.desc}
                                    onChange={(e) => handlePanelChange(panelIndex, e)}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    rows="2"
                                    placeholder="Enter panel description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Panel Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(e) => handleFileChange(e)}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                />
                            </div>

                            {/* Keypoints */}
                            <div>
                                <h4 className="text-lg font-semibold">Keypoints</h4>
                                {panel.keypoints?.map((keypoint, keypointIndex) => (
                                    <div key={keypointIndex} className="border-t border-gray-200 pt-4">
                                        <div>
                                            <label className="block text-sm font-medium">Keypoint Title</label>
                                            <input
                                                type="text"
                                                name="keytitle"
                                                value={keypoint.keytitle}
                                                onChange={(e) => handleKeypointChange(panelIndex, keypointIndex, e)}
                                                className="mt-1 block w-full p-2 border rounded-md"
                                                placeholder="Enter keypoint title"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium">Keypoint Detail</label>
                                            <textarea
                                                name="keydetail"
                                                value={keypoint.keydetail}
                                                onChange={(e) => handleKeypointChange(panelIndex, keypointIndex, e)}
                                                className="mt-1 block w-full p-2 border rounded-md"
                                                rows="2"
                                                placeholder="Enter keypoint detail"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addKeypoint(panelIndex)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Add Keypoint
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addPanel} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                        Add Panel
                    </button>
                </div>

                {/* FAQs */}
                <div>
                    <h3 className="text-xl font-bold">FAQs</h3>
                    <div>
                        <label className="block text-sm font-medium">FAQs Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.faqs?.title}
                            onChange={(e) => setFormData((prevState) => ({
                                ...prevState,
                                faqs: {
                                    ...prevState.faqs,
                                    title: e.target.value
                                }
                            }))}
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Enter FAQs title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">FAQs Description</label>
                        <textarea
                            name="description"
                            value={formData?.faqs?.description}
                            onChange={(e) => setFormData((prevState) => ({
                                ...prevState,
                                faqs: {
                                    ...prevState.faqs,
                                    description: e.target.value
                                }
                            }))}
                            className="mt-1 block w-full p-2 border rounded-md"
                            rows="2"
                            placeholder="Enter FAQs description"
                        />
                    </div>

                    {formData.faqs?.questions?.map((faq, index) => (
                        <div key={index} className="border-t border-gray-200 pt-4">
                            <div>
                                <label className="block text-sm font-medium">Question</label>
                                <input
                                    type="text"
                                    name="question"
                                    value={faq?.question}
                                    onChange={(e) => {
                                        const updatedQuestions = [...formData.faqs.questions];
                                        updatedQuestions[index].question = e.target.value;
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            faqs: {
                                                ...prevState.faqs,
                                                questions: updatedQuestions
                                            }
                                        }));
                                    }}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    placeholder="Enter the question"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Answer</label>
                                <textarea
                                    name="answer"
                                    value={faq.answer}
                                    onChange={(e) => {
                                        const updatedQuestions = [...formData.faqs.questions];
                                        updatedQuestions[index].answer = e.target.value;
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            faqs: {
                                                ...prevState.faqs,
                                                questions: updatedQuestions
                                            }
                                        }));
                                    }}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    rows="2"
                                    placeholder="Enter the answer"
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addFaq} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                        Add FAQ
                    </button>
                </div>

                <div>
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminContentForm;
