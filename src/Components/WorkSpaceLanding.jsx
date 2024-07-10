import React from "react";

const WorkSpaceLanding = () => {
  return (
    <div className="flex">
      <MainContent />
    </div>
  );
};

const MainContent = () => {
  return (
    <div className=" bg-white h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Company Home</h1>
        <p className="text-gray-600">
          Convert all those scattered pages into a Notion database with one
          click — while keeping the easy-to-read page format.
        </p>
        <p className="text-gray-500 mt-2">
          <strong>Notion Tip:</strong> Use this template to organize important
          information for your team. Add owners, verification, and tags to pages
          to keep them up to date. Just replace this sample content with your
          own.
        </p>
      </header>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Team</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Getting Started</li>
          <li>Mission, Vision, Values</li>
          <li>Global Offices</li>
          <li>Corporate Travel</li>
          <li>Recent Press</li>
          <li>What's New?</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Policies</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Vacation Policy</li>
          <li>Morale Events</li>
          <li>Benefits Policies</li>
          <li>Expense Policy</li>
        </ul>
      </section>
    </div>
  );
};

export default WorkSpaceLanding;
