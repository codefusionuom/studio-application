import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg //visual icon
      xmlns="http://www.w3.org/2000/svg" //the namespace for the SVG element
      fill="none" //Sets the fill color
      viewBox="0 0 24 24" //Specifies the coordinate system for the SVG content
      strokeWidth={2} //Sets the width of the SVG strokes
      stroke="currentColor" //Sets the color of the SVG strokes.
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path //defining the actual shape of the icon using path data
        strokeLinecap="round" //Sets the style of the path's end points
        strokeLinejoin="round" //Sets the style of path segment connections
        d="M19.5 8.25l-7.5 7.5-7.5-7.5" //Defines the actual path data using a sequence of commands and coordinates.
      />
    </svg>
  );
}

function DepartmentAccordion() {

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}> 
        <AccordionHeader onClick={() => handleOpen(1)}>
          Photography
        </AccordionHeader>
        <AccordionBody>
          wedding
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Editorial
        </AccordionHeader>
        <AccordionBody>
          Wedding photo edit
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Finance
        </AccordionHeader>
        <AccordionBody>
          Bill handling
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default DepartmentAccordion;
