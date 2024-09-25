import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PS from '../../assets/img/problemSolving.png';
import axios from 'axios';

export const SignUpStyle = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  overflow-y: auto;

  .sign-up {
    display: flex;
    height: 60%;
    justify-content: space-between;
  }
  .con-img img {
    transform: rotate(-90deg);
  }
  .con-img {
    width: 50%;
    display: none;
    align-items: start;

    @media screen and (min-width: 769px) {
      display: block;
      margin-top: 60px;
    }
  }
  .form-con {
    width: 100%;

    @media screen and (min-width: 769px) {
      width: 50%;
    }
  }
  input {
    width: 100%;
    font-size: 1rem;
    padding: 15.5px 21px;
    margin-bottom: 15px;
    outline: none;
    background: var(--off-white);
    border: 1px solid var(--lighter-grey);
    border-radius: 5px;
  }
  label {
    color: var(--black);
    font-weight: 500;
    text-transform: capitalize;
    font-size: 1.2em;
  }
  .auth-btn {
    border: none;
    padding: 15.5px 30px;
    background: var(--lighter-blue);
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    border: 4px solid var(--off-white);
    border-radius: 50%;
    border-top: 4px solid var(--black);
    width: 16px;
    height: 16px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .password-container {
    position: relative;
    width: 100%;
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

interface FormData {
    full_name: string;
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        console.log('Submitting form data:', formData); // Log form data

        try {
            const response = await axios.post('http://127.0.0.1:8000/sign-up/', formData);
            console.log('User signed up:', response.data);
            alert('Sign up successful! Proceed to Login');
            navigate('/login');
            // Clear input fields
            setFormData({
                full_name: '',
                email: '',
                username: '',
                password: '',
                confirm_password: '',
            });

            // Handle successful signup (e.g., redirect to login page)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Error response:', error.response.data); // Log response error
                    alert(`Sign up failed: ${error.response.data.detail || 'Please try again.'}`);
                } else {
                    console.error('Error message:', error.message);
                    alert('Sign up failed: No response from server. Please try again later.');
                }
            } else {
                console.error('Unexpected error:', error);
                alert('Sign up failed: An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <SignUpStyle>
            <div className="sign-up container">
                <div className={'con-img'}>
                    <img className={'rotate-vertical'} src={PS} alt="p-s" />
                </div>
                <div className={'form-con'}>
                    <form onSubmit={handleSubmit}>
                        <div className={'input-field'}>
                            <label htmlFor={'full_name'}>Full Name</label>
                            <input
                                id={'full_name'}
                                name={'full_name'}
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={'input-field'}>
                            <label htmlFor={'email'}>Email Address</label>
                            <input
                                id={'email'}
                                name={'email'}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={'input-field'}>
                            <label htmlFor={'username'}>User Name</label>
                            <input
                                id={'username'}
                                name={'username'}
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={'input-field password-container'}>
                            <label htmlFor={'password'}>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id={'password'}
                                name={'password'}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                {showPassword ? 'Hide' : 'Show'}
              </span>
                        </div>
                        <div className={'input-field password-container'}>
                            <label htmlFor={'confirm_password'}>Confirm Password</label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id={'confirm_password'}
                                name={'confirm_password'}
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </span>
                        </div>

                        <button className="auth-btn" type="submit" disabled={loading}>
                            {loading ? <div className="loader"></div> : 'Sign up'}
                        </button>
                    </form>
                    <div>
                        <p>
                            Have an account? <a href={'/login'}>Log in</a>
                        </p>
                    </div>
                </div>
            </div>
        </SignUpStyle>
    );
};

export default SignUp;