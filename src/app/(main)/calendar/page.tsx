"use client";

import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { useState } from "react";
import ScheduleEmailForm from "../../_components/schedule-email-form";

export default function EmailScheduler() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledEmails, setScheduledEmails] = useState([]);
  const [newEmail, setNewEmail] = useState({
    subject: "",
    recipient: "",
    body: "",
    scheduledTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  });

  // Calendar navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Handle date selection
  const handleDateClick = (day) => {
    setSelectedDate(day);
    setNewEmail((prev) => ({
      ...prev,
      scheduledTime: format(day, "yyyy-MM-dd'T'HH:mm"),
    }));
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const emailToSchedule = {
  //     ...newEmail,
  //     id: Date.now(),
  //     scheduledAt: newEmail.scheduledTime,
  //   };
  //   setScheduledEmails([...scheduledEmails, emailToSchedule]);
  //   setNewEmail({
  //     subject: "",
  //     recipient: "",
  //     body: "",
  //     scheduledTime: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),
  //   });
  // };

  // Filter emails for selected date
  const emailsForSelectedDate = scheduledEmails.filter((email) =>
    isSameDay(parseISO(email.scheduledAt), selectedDate)
  );

  return (
    <>
      <div className="h-full ">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-8">
             Schedule Emails
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar Section */}
            <div className="lg:w-2/5 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h2 className="text-xl font-semibold text-gray-700">
                    {format(currentMonth, "MMMM yyyy")}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-500 py-2"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {daysInMonth.map((day, i) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const hasScheduledEmails = scheduledEmails.some((email) =>
                      isSameDay(parseISO(email.scheduledAt), day)
                    );

                    return (
                      <button
                        key={i}
                        onClick={() => handleDateClick(day)}
                        className={`h-12 rounded-lg flex flex-col items-center justify-center text-sm
                        ${
                          isSameMonth(day, currentMonth)
                            ? "text-gray-800"
                            : "text-gray-300"
                        }
                        ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }
                      `}
                      >
                        {format(day, "d")}
                        {hasScheduledEmails && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-1 
                          ${isSelected ? "bg-white" : "bg-blue-500"}`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Selected Date
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700 font-medium">
                      {format(selectedDate, "EEEE, MMMM do, yyyy")}
                    </p>
                    <input
                      type="time"
                      value={format(selectedDate, "HH:mm")}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(":");
                        const newDate = new Date(selectedDate);
                        newDate.setHours(hours);
                        newDate.setMinutes(minutes);
                        setSelectedDate(newDate);
                        setNewEmail((prev) => ({
                          ...prev,
                          scheduledTime: format(newDate, "yyyy-MM-dd'T'HH:mm"),
                        }));
                      }}
                      className="mt-2 bg-white border border-blue-200 rounded-md px-3 py-2 text-blue-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email Scheduling Section */}
            <div className="lg:w-3/5 flex flex-col gap-6">
              {/* New Email Form */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-6">
                    Schedule New Email
                  </h2>

                  <ScheduleEmailForm
                    selectedDate={format(selectedDate, "yyyy-MM-dd'T'HH:mm")}
                  />
                </div>
              </div>

              {/* Scheduled Emails List */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-6">
                    Scheduled Emails for {format(selectedDate, "MMMM do, yyyy")}
                  </h2>

                  {emailsForSelectedDate.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2">No emails scheduled for this date</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {emailsForSelectedDate.map((email) => (
                        <li key={email.id} className="py-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {email.subject}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {email.recipient}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-700">
                                {format(parseISO(email.scheduledAt), "h:mm a")}
                              </p>
                              <button
                                onClick={() =>
                                  setScheduledEmails(
                                    scheduledEmails.filter(
                                      (e) => e.id !== email.id
                                    )
                                  )
                                }
                                className="text-sm text-red-500 hover:text-red-700"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}
