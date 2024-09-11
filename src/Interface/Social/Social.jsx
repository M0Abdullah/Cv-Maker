import React from 'react';
import { Input, Button } from 'antd';
import './Social.css';
export default function Social({  sociallink, setSociallink }) {

    function Addsociallink() {
        setSociallink([...sociallink, '']);
    }

    function deletesociallink(index) {
        setSociallink(sociallink.filter((_, i) => i !== index));
    }

    const handleInputChange = (value, index) => {
        const newLinks = [...sociallink];
        newLinks[index] = value;
        setSociallink(newLinks);
    };

    return (
        <div>
            <div className="main-11">
                <div className="detail">
                    Add Social link like Github, LinkedIn, etc.
                </div>
                {sociallink.map((link, index) => (
                    <div key={index} className="inputfield">
                        <Input
                            placeholder="Add Your Social Link"
                            style={{ maxWidth: '100%', height: '50px' }}
                            value={link}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                        />
                    </div>
                ))}
                <div className="btn1">
                    <Button
                        style={{ margin: '10px', color: 'black', height: '40px', width: '150px' }}
                        onClick={() => deletesociallink(sociallink.length - 1)}
                    >
                        Delete Link
                    </Button>
                    <Button
                        style={{ margin: '10px', color: 'black', height: '40px', backgroundColor: '#0891b2', color: 'white', width: '150px' }}
                        onClick={Addsociallink}
                    >
                        Add Social
                    </Button>
                </div>
                <hr />
            </div>
        </div>
    );
}