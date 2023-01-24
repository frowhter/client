import React from 'react';

interface IPaginationProps{
    children: React.ReactNode;
    className?: string
}

const Pagination: React.FC<IPaginationProps> = ({children, className}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default Pagination;