import React, { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import AssignmentSubmit from "./AssignmentSubmit";
import { getAssignmentDetails, getCachedData } from "./Api";
import MDEditor from "@uiw/react-md-editor";
import { Formik } from "formik";
import { assignmentDetailsType } from "./models/assignmentDetailsType";
import { number, string } from "yup";

const AssignmentDetails: FC = () => {
  let cachedAssignmentDetails;

  try {
    cachedAssignmentDetails = getCachedData("assignment_details") || [];
  } catch (e) {
    console.log("error is here", e);
  }
  const [assignmentDetails, setAssignmentDetails] =
    useState<assignmentDetailsType>(cachedAssignmentDetails);

  const data: any = useParams();

  useEffect(() => {
    const token = getAssignmentDetails(data);
    token.then(assignmentDetailsData => {
      setAssignmentDetails(assignmentDetailsData);
    });
  }, []);

  return (
    <div className="flex bg-gray-200 ">
      <div>
        <LeftSideBar />
      </div>

      <div className=" bg-white rounded-md grid-flow-row auto-rows-max mx-9 mt-16 mb-28 grid grid-cols-1 divide-y-8 ">
        <p className="text-2xl p-3 font-semibold ">
          Assignment Details ({assignmentDetails.assignment_id})
        </p>

        <div className="flex p-3">
          <p className="text-xl ml-3 font-semibold"> Title: </p>
          <p className="text-xl ml-48"> {assignmentDetails.title} </p>
        </div>

        <div className="flex p-3">
          <p className="text-xl ml-3 font-semibold"> Due Date: </p>
          <p className="text-xl ml-36 ">
            {DateTime.fromISO(assignmentDetails.due_date).toFormat("LLL dd, yyyy")}{" "}
          </p>
        </div>

        <div className="flex p-3">
          <p className="text-xl ml-3 font-semibold"> Description: </p>

          <MDEditor.Markdown
            className="markdown text-xl ml-32 !text-black font-bold !bg-white"
            source={assignmentDetails.description}
          />
        </div>

        <div className="flex ml-7 pt-9 ">
          <AssignmentSubmit />
          <span className="mx-3"> </span>
          <Link to="https://www.sochokuchnaya.com" className="text-md mt-6">
            See Your Submission-
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
