import React from 'react';
import Login from "../Pages/Login";
import SignUp from "../../way_labot/SignUp";
import Dashboard from "../Pages/Dashboard";
import Main from "../Pages/Main";
import PatientMedication from "../Pages/PatientMedication";
import StocksAndSupplies from "../Pages/StocksAndSupplies";
import Wards from "../Pages/Wards";
import Patient from "../PatientsPages/Patient";
import Appointment from "../Pages/Appointment";
import OutPatient from "../PatientsPages/OutPatient";
import WaitingLists from "../PatientsPages/WaitingLists";
import CurrentInPatient from "../PatientsPages/CurrentInPatient";
import PrivateRoute from '../Components/PrivateRoute';
import PatientLists from "../PatientsPages/PatientLists";
import DischargePatient from "../PatientsPages/DischargePatient";
import MainInPatient from "../PatientsPages/MainInPatient";
import StaffAllocation from "../Pages/StaffAllocation";
import LocalDoctors from '../Pages/LocalDoctors';
import HomePage from '../Pages/HomePage';

const routes = [
    {
        path:"/homePage",
        element:<HomePage/>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signUp",
        element: <SignUp />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Main />,
                
            },
            
            {
                path: "patientMed",
                element: <PatientMedication />
            },
            {
                path: "staffAlloc",
                element: <StaffAllocation />
            },
           
           
        
            {
                path: "stocksAndSupplies",
                element: <StocksAndSupplies />
            },
            {
                path: "wards",
                element: <Wards />
            },
            {
                path: "appointment",
                element: <Appointment />
            },

            {
                path: "patient",
                element: <Patient />,
                children: [
                    {
                        index:true,
                        element:<PatientLists/>
                    },
                    {
                        path:"allPatientLists",
                        element:<PatientLists/>
                    },
                                       
                    {
                        path: "outPatient",
                        element: <OutPatient />
                    },
                    {
                        path: "waitingLists",
                        element: <WaitingLists />
                    },
                    {
                        path: "currentInPatient",
                        element: <MainInPatient />,
                        children: [
                            {
                                index:true,
                                element: <CurrentInPatient/>
                            },
                            {
                                path:'dischargePatient',
                                element:<DischargePatient/>
                            }
                        ]
                   
                    },
                    
                    {
                        path: "currentInPatient",
                        element: <CurrentInPatient />
                    }
                ]
            },
            {
                path:"localDoctors",
                element:<LocalDoctors/>
            }
        ]
    }
];

export default routes;
