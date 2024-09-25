import React from 'react';
import myImage from '../../assets/img/Brain.png';
import styled from "styled-components";

const Home = () => {
    const HomeStyle = styled.nav`
      width: 100%;
      display: flex;
      justify-content: center;
      .img-con{
        margin-top: 50px;
      }
      img{
        width: 100%;
      }
      .tagline{
        font-size: 50px;
        color: grey;
      }
      .btn{
        width: 100%;
        min-width: 20px;
       margin: 50px;
        padding: 20px;
        background: lightskyblue;
      }
      
`;
    return (
        <HomeStyle>
            <div className="img-con">
                <img src={myImage} alt="Description" />
                <h1 className={"tagline"}>
                   Practice Problem solving
                </h1>
            </div>
        </HomeStyle>
    );
};

export default Home;