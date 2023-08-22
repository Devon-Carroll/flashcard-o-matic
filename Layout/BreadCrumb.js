import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();

  // Define custom breadcrumb names based on the route
  const breadcrumbNames = {
    "/decks/new": "Create Deck",
    "/decks/:deckId": "Deck",
    "/decks/:deckId/edit": "Edit Deck",
    "/decks/:deckId/study": "Study",
    "/decks/:deckId/cards/new": "Add Card",
    "/decks/:deckId/cards/:cardId/edit": "Edit Card",
  };

  // Split the pathname and filter out empty strings
  const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");

  // Initialize the current path to build the dynamic path
  let currentPath = "";

  // Map the path segments to breadcrumb components
  const breadcrumbComponents = pathSegments.map((segment, index) => {
    currentPath += `/${segment}`;
    if (breadcrumbNames[currentPath]) {
      const breadcrumbName = breadcrumbNames[currentPath];
      return (
        <div className="crumb" key={segment}>
          <NavLink to={currentPath}>{breadcrumbName}</NavLink>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="breadcrumbs">
      <NavLink to="/">Home</NavLink>
      {breadcrumbComponents}
    </div>
  );
};

export default BreadCrumb;