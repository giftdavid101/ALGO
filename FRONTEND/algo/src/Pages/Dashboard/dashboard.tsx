import React from 'react';
import styled from "styled-components";
import Monacoeditor from "../../components/organisms/monacoeditor";
import MonacoEditorComponent from "../../components/organisms/monacoeditor";


const DashboardStyle = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  .challenges{
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }
`;

const Dashboard = () => {
    return (
        <DashboardStyle>

            <div className={'challenges container'}>

                <div>
                    Questions
                </div>
                <div>
                    <MonacoEditorComponent />
                </div>
            </div>

        </DashboardStyle>
    );
};

export default Dashboard;