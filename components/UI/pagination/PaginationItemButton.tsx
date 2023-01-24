import React, {memo} from 'react';
import Button from "../Buttons/Button";
import btnClasses from '../Buttons/Button.module.scss'


interface IPaginationItemProps{
    children: React.ReactNode;
    active: boolean;

    onClick: ()=>void;
}
const PaginationItemButton: React.FC<IPaginationItemProps> = memo(({children, active, onClick}) => {
    return (
        <Button onClick={onClick} className={active ? btnClasses.filled + ' ' + btnClasses.blank_text_white+ ' ' + btnClasses.navigatePagination : btnClasses.blank_text_blue+ ' ' + btnClasses.navigatePagination}>
            {children}
        </Button>
    );
});

export default PaginationItemButton;