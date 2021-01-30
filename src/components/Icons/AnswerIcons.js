import React from 'react';
import { CheckCircle } from '@styled-icons/boxicons-regular/CheckCircle';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { CloseCircleOutline } from '@styled-icons/evaicons-outline/CloseCircleOutline';



export const RightAnswer = () => <CheckCircle size="19" color="#00ff15" />;
export const WrongAnswer = () => <CloseCircleOutline size="19" color="#ff0000" />;
export const TheRightAlternative = () => <Check size="19" color="#42ff52" />;
