import React from 'react';
const SeparatedSection: React.FC = ({children})=>{
    return (
        <div className="container">
            {children}
            <div className="my-3 border-b border-y-black container"></div>
        </div>
    )
}
export default SeparatedSection