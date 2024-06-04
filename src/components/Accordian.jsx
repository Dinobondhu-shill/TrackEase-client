const Accordian = () => {
return (
<div className="flex flex-col gap-3">
  <div className="collapse collapse-plus bg-base-200">
    <input type="radio" name="my-accordion-3" defaultChecked />
    <div className="collapse-title text-xl font-medium">
      Streamlined Asset Tracking
    </div>
    <div className="collapse-content">
      <p>Our intuitive interface enables HR Managers to effortlessly track the usage and whereabouts of company assets,
        ensuring accountability and transparency within the organization.</p>
    </div>
  </div>
  <div className="collapse collapse-plus bg-base-200">
    <input type="radio" name="my-accordion-3" />
    <div className="collapse-title text-xl font-medium">
    Customizable Asset Categories
    </div>
    <div className="collapse-content">
      <p> Whether it's laptops, desks, or stationery items, our system allows for easy categorization of assets based on their type, making it convenient to manage diverse inventory.</p>
    </div>
  </div>
  <div className="collapse collapse-plus bg-base-200">
    <input type="radio" name="my-accordion-3" />
    <div className="collapse-title text-xl font-medium">
    Subscription-Based Access
    </div>
    <div className="collapse-content">
      <p>With a flexible subscription model, any company can access our web application, regardless of its size or industry. We believe in providing affordable solutions tailored to your needs.</p>
    </div>
  </div>
  <div className="collapse collapse-plus bg-base-200">
    <input type="radio" name="my-accordion-3" />
    <div className="collapse-title text-xl font-medium">
    Real-Time Insights
    </div>
    <div className="collapse-content">
      <p>Gain valuable insights into asset utilization patterns, maintenance schedules, and overall asset performance through comprehensive reporting and analytics features</p>
    </div>
  </div>
</div>
);
};

export default Accordian;