

export interface ModalResponseState{
    response: string;
    isLoading: boolean;
    visible: boolean;
    error: string;
    close: ()=> void;
}