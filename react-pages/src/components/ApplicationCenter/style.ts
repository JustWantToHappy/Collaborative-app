import styled from 'styled-components';

const StyleDiv = styled('div')<{mode?:string}>`
  height:75vh;
  overflow: auto;
  padding-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  padding-top:1rem;
  align-items: flex-start;
  gap:3rem;
  
  &::-webkit-scrollbar {
    width:6px;
  }
  &::-webkit-scrollbar-track {
    border-radius:4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:var(--ab-grey-300);
  }
  &::-webkit-scrollbar-thumb:hover {
    background:var(--ab-grey-400);
  }
  &::-webkit-scrollbar-thumb:window-inactive {
    background:var(--ab-grey-300);
  }

  
  &>div{
    width:270px;
    cursor: pointer;
    box-shadow: ${props=>props.mode==='dark'?'rgba(255, 255, 255, 0.35) 0px 5px 15px':'rgba(0, 0, 0, 0.35) 0px 5px 15px'};
    transition: transform ease 300ms;
    border-radius: .5rem;
    header{
      font-size: 1.2rem;
      color:var(--ab-white-100);
      height:4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding:0 1rem;
      border-radius: .5rem .5rem 0 0;
    }
    &>div{
      text-align: center;
      padding:2rem;
    }

    &:hover{
      transform: translateY(-1rem);
      /*filter: blur(1px);*/
    }
  }
`;

export default StyleDiv;