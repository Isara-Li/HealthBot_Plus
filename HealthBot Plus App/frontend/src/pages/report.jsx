import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../tailwind.css";

const Report = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      const reportsData = {
        1: {
          id: "1",
          date: "2023-08-20",
          investigation: "Cancer",
          status: "Reviewed",
          reviewedOn: "2023-08-22",
          details: `
            This report investigates the presence of cancerous cells in the biopsy taken from the patient's skin. 
            The pathology results indicate the presence of malignant melanoma. The lesion was excised, and 
            margins were checked for clearance. Immunohistochemical staining confirmed the diagnosis, 
            with markers such as S-100, HMB-45, and Melan-A showing positive results. The tumor thickness 
            was measured at 1.2 mm, placing it in the intermediate risk category according to the Breslow scale.
          `,
        },
        2: {
          id: "2",
          date: "2023-07-15",
          investigation: "Atopic Dermatitis",
          status: "Pending",
          reviewedOn: null,
          details: `
            This report covers the examination of a skin sample to assess chronic inflammatory conditions. 
            The clinical presentation, characterized by red, itchy patches, is consistent with Atopic Dermatitis.
            Histopathological examination revealed epidermal spongiosis, hyperkeratosis, and infiltration of lymphocytes 
            and eosinophils. There is no evidence of bacterial or fungal superinfection. Treatment with topical corticosteroids 
            and moisturizers is recommended, along with avoiding known allergens.
          `,
        },
        3: {
          id: "3",
          date: "2023-06-10",
          investigation: "Benign Keratosis",
          status: "Reviewed",
          reviewedOn: "2023-06-12",
          details: `
            The biopsy specimen examined in this report was consistent with Benign Keratosis, particularly 
            Seborrheic Keratosis. The lesion appeared as a well-demarcated, pigmented plaque with a verrucous surface.
            Histologically, it showed hyperkeratosis, acanthosis, and the presence of pseudocysts filled with keratin.
            No signs of malignancy were detected, and the lesion is considered benign. Regular monitoring is suggested 
            due to the potential for similar lesions to appear in the future.
          `,
        },
        4: {
          id: "4",
          date: "2023-05-05",
          investigation: "Dermatofibroma",
          status: "Pending",
          reviewedOn: null,
          details: `
            The clinical findings suggest a Dermatofibroma, a common benign fibrous nodule often found on the legs. 
            The lesion is firm, hyperpigmented, and mobile under the skin. Histopathological analysis shows a dense 
            collection of fibroblasts and histiocytes, with a characteristic collagen trapping at the lesion's periphery.
            No cellular atypia or signs of malignancy are present. Although benign, the lesion may persist indefinitely, 
            and removal is only necessary if symptomatic.
          `,
        },
        5: {
          id: "5",
          date: "2023-04-01",
          investigation: "Actinic Keratosis",
          status: "Reviewed",
          reviewedOn: "2023-04-03",
          details: `
            Actinic Keratosis was confirmed through the biopsy of a rough, scaly patch on sun-exposed skin. 
            The histopathology report indicates dysplasia in the basal layer of the epidermis, with signs of 
            solar elastosis in the dermis. While considered precancerous, there is a risk of progression to 
            squamous cell carcinoma if untreated. Cryotherapy or topical agents such as 5-fluorouracil or 
            imiquimod are recommended for treatment, alongside sun protection measures.
          `,
        },
      };

      // Fetch the correct report based on the stringified reportId
      const reportData = reportsData[String(reportId)];
      setReport(reportData);
    };

    fetchReportDetails();
  }, [reportId]);

  const handleBackClick = () => {
    navigate("/patient");
  };

  if (!report)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <img
          src={"/images/SkinVision-Logo.png"}
          alt="Product Logo"
          className="w-32 h-auto"
        />
        <button
          className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
          onClick={handleBackClick}
        >
          Back to Dashboard
        </button>
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Full Report</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-lg mb-4">
          <strong>Date:</strong> {report.date}
        </p>
        <p className="text-lg mb-4">
          <strong>Investigation:</strong> {report.investigation}
        </p>
        <p className="text-lg mb-4">
          <strong>Status:</strong> {report.status}
        </p>
        <p className="text-lg mb-4">
          <strong>Reviewed On:</strong> {report.reviewedOn || "N/A"}
        </p>
        <p className="text-lg mb-2">
          <strong>Details:</strong>
        </p>
        <p className="whitespace-pre-line text-gray-700 bg-gray-50 p-4 rounded-lg">
          {report.details}
        </p>
      </div>
    </motion.div>
  );
};

export default Report;
