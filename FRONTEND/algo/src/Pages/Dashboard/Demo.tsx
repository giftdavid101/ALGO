import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const DemoStyle = styled.div`
  width: 100%;
  height: 94vh;
  display: flex;
  ;
.demo-content{
  align-self: center;
}
  .title{
    margin-bottom: 30px;
    text-align: center;
  }
  .simplest_problem{
    margin-top: 20px;
  }
  .algo-resp{
    font-weight: normal;
    margin-top: 20px
  }
  .break-down{
    width: 50%;
   margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-self: center;
    //background: rebeccapurple;
  }
  li{
    margin-top: 20px;
  }
  i{
    color: #666666;
  }
  .btn{
    width: 10%;
    background: cadetblue;
    border: none;
    padding: 12px 18px;
    margin-top: 10px;
    cursor: pointer;
  }
`
const Demo = () => {
    const navigate = useNavigate()

    const handleContinueClick = () => {
        navigate('/dashboard');
    };
    return (
        <DemoStyle>
            <div className={"demo-content container"}>
                <div className={'title'}>
                    <h1>Welcome User🙂!</h1>
                    <h6>Develop Your Problem-Solving Skills with Algo</h6>
                </div>

                <div>
                    <p>Lets start with the simplest problem</p>
                </div>


                <div className={'simplest_problem'}>
                    <strong>
                        **Question**:
                        If You Have 2 Apples And You Get 2 More Apples,
                        How Many Apples Do You Have In Total?
                    </strong>


                    <p className={'algo-resp'}>Hey! Hollup! dont answer just yet!</p>
                </div>


                <div className={'break-down'}>
                    <p style={{marginBottom: 5}}>Lets break it down,</p>

                    <ol>
                        To master the act of problem solving, Here are the list of things you should know. <br/>
                        (Most important rule: Break down the problem into smaller chunks for easy understanding)
                         <div>
                             <li> Understand the Problem (Reread the question)</li>
                             <i>Reread the question.</i>
                         </div>
                        <div>
                            <li>Highlight what the question wants you to do (goals, objectives) and think about the output at the same time</li>
                            <i>From our simple problem, Goal: is to find the Apples in total.</i>
                        </div>

                        <div>
                            <li>Identify  all the inputs( both internal and external) required</li>
                            <i>Well from the statement "If You Have 2 Apples" assumes we have an internal INPUT1 already.
                              "And You Get 2 More Apples" shows and external INPUT2.
                            </i>
                        </div>
                        <div>
                            <li>What are the processes needed to achieve the outcome?(outline all you need to do to get your output)</li>
                            <i>
                               In this case,
                                <ol>
                                    <li> Get all the inputs</li>
                                    <div>
                                        <li> add all inputs together</li>
                                        <i>use the plus sign</i>
                                    </div>

                                    <li> get result of all inputs</li>
                                </ol>

                            </i>
                        </div>

                    </ol>
                </div>
                <p>Click continue Lets run this in our environment</p>
                <button onClick={handleContinueClick} className={'btn'}>Continue</button>

                {/*<h2>Pseudocode</h2>*/}
                {/*<div>*/}
                {/*    Container = a*/}
                {/*    Container += b*/}
                {/*</div>*/}
                {/*<h3>try running in your coding environment.</h3>*/}


                {/*Your brain should be able to write a quick efficient solution for complicated stuff*/}
                {/*Algo will teach you how to write these with plenty codes*/}
                {/*<p>Lets break down </p>*/}
                {/*click to continue Lets start real problem solving.*/}
                {/*<button>Continue</button>*/}

            </div>

        </DemoStyle>
    );
};

export default Demo;