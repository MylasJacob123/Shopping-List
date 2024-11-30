import React from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <h2 className="privacy-title">Privacy and Data Protection</h2>
      <p className="privacy-intro">
        By using this application, you agree to the collection and processing of your data in accordance with our privacy policy.
      </p>

      <div className="privacy-section">
        <h3>What Data We Collect:</h3>
        <ul>
          <li>
            <strong>Location Information:</strong> Your location may be collected to show products available near you or provide location-specific discounts.
          </li>
          <li>
            <strong>Shopping Preferences:</strong> Information like preferred clothing sizes, styles, and saved items may be saved to customize your shopping experience.
          </li>
          <li>
            <strong>Purchase and Browsing History:</strong> We may collect anonymized data on items you browse, add to your cart, or purchase to provide personalized recommendations.
          </li>
          <li>
            <strong>Usage Data:</strong> Interaction data is collected to improve app performance and features.
          </li>
        </ul>
      </div>

      <div className="privacy-section">
        <h3>How We Use Your Data:</h3>
        <ul>
          <li><strong>Personalized Recommendations:</strong> We use your preferences to suggest items tailored to your style and size.</li>
          <li><strong>Location-Based Services:</strong> With permission, location data may be used for local promotions and nearby stores.</li>
          <li><strong>Performance and Analytics:</strong> Anonymized usage data helps us enhance app functionality and user experience.</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h3>Data Security:</h3>
        <p>We are committed to protecting your information with physical, electronic, and managerial safeguards.</p>
      </div>

      <div className="privacy-section">
        <h3>Third-Party Services:</h3>
        <p>
          We use third-party services, such as payment processors and analytics providers. Please review their privacy policies for more information.
        </p>
      </div>

      <div className="privacy-section">
        <h3>Your Rights:</h3>
        <ul>
          <li>You can access, update, or delete any personal information we hold by contacting support.</li>
          <li>You can disable location services in your device settings, though some features may be affected.</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h3>Consent:</h3>
        <p>
          By using this application, you consent to the collection and use of your data as outlined in this policy. 
          For the full privacy policy, please visit <a href="/privacy-policy">here</a>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
