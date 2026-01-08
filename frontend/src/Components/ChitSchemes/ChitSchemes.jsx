import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FaArrowRight } from "react-icons/fa";
import { fetchChitPlans } from "../../api/index.js";
import EnrollForm from "../Brochure/EnrollForm";

const filters = [
  "All",
  "Chits Scheme 1-20 Months",
  "Chits Scheme 1-25 Months",
  "Chits Scheme 1-30 Months",
  "Chits Scheme 1-40 Months",
];

const colorPalette = [
  "#1F618D", "#6C3483", "#117864", "#AF601A", "#7B241C",
  "#0E6251", "#4A235A", "#784212", "#154360", "#512E5F",
  "#1A5276", "#633974", "#186A3B"
];

const ChitSchemes = () => {
  
  const [plans, setPlans] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const { data } = await fetchChitPlans();

        // Normalize backend → frontend shape
        const mappedPlans = data.map((plan) => ({
          id: plan._id,
          name: plan.planName,
          value: `₹${plan.totalAmount.toLocaleString("en-IN")}`,
          subscription: `₹${plan.monthlySubscription.toLocaleString("en-IN")}/month`,
          min: `₹${plan.minBidding.toLocaleString("en-IN")}`,
          max: `₹${plan.maxBidding.toLocaleString("en-IN")}`,
          image: plan.image,
          filter: `Chits Scheme 1-${plan.duration} Months`,
        }));

        setPlans(mappedPlans);
      } catch (error) {
        console.error("Failed to fetch chit plans", error);
      }
    };

    loadPlans();
  }, []);

  const filteredPlans =
    activeFilter === "All"
      ? plans
      : plans.filter((plan) => plan.filter === activeFilter);

  const handleEnrollClick = (plan) => {
    setSelectedPlan(plan.name);
    setShowModal(true);
  };

  return (
    <section className="section-area section-sp2 bg-light">
      <div className="chits-container container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h2 className="text-primary heading-bx style1 title-head-sm chits-section mb-0">
            Explore Chit Plans
          </h2>
          <a href="/chits-plans" className="btn view-all-btn d-flex text-white align-items-center">
            View All <FaArrowRight size={16} style={{ marginLeft: "5px" }} />
          </a>
        </div>

        <div className="filter-tabs d-flex gap-4 pb-2 mb-4 flex-wrap">
          {filters.map((filter, i) => (
            <button key={i} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filteredPlans.map((plan, index) => {
            const bgColor = colorPalette[index % colorPalette.length];

            return (
              <div className="col  col-lg-4 col-xl-4" key={plan.id}>
                <div
                  className="chit-card shadow-sm text-center text-white"
                  style={{ backgroundColor: bgColor, minHeight: "400px" }}
                >
                  {plan.image && (
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="card-img-top mb-3"
                      style={{ maxHeight: "160px", objectFit: "cover" }}
                    />
                  )}

                  <div className="chit-card-body">
                    <h5 className="chit-title">{plan.name}</h5>
                    <p className="chit-amount"><span>{plan.value} /-</span></p>

                    <p className="chit-monthly-plan">
                      Monthly Subscription:
                      <strong>{plan.subscription}</strong>
                      <Tippy
                        content={
                          <>
                            Minimum Bid: {plan.min}
                            <br />
                            Maximum Bid: {plan.max}
                          </>
                        }
                        placement="top"
                      >
                        <span className="ms-2" style={{ cursor: "pointer" }}>
                          <FontAwesomeIcon icon={faInfoCircle} color="white" />
                        </span>
                      </Tippy>
                    </p>

                    <button
                      onClick={() => handleEnrollClick(plan)}
                      className="enroll-btn btn btn-sm text-white"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPlans.length === 0 && (
          <p className="text-center mt-4 text-muted">
            No plans available under this scheme.
          </p>
        )}
      </div>

      <EnrollForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
};

export default ChitSchemes;
