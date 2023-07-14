import styled from 'styled-components';


interface Props{
  asideWidth: string;
  showHeaderBorder?: boolean;
}

export const StyleDiv = styled('div') <Props>`
  --aside-width:${props => props.asideWidth};
  --main-width:calc(100% - var(--aside-width));
  
  min-width:500px;

  aside{
    width:var(--aside-width);
    top:var(--ab-nav-height);
    display: block;
    position: fixed;
    height:calc(100vh - var(--ab-nav-height));
    border-right:1px solid var(--ab-grey-200);
  }
  main{
    left:var(--aside-width);
    position: absolute;
    width: 100%;
    top:var(--ab-nav-height); 
    flex:1;
  }
  .header{
    width:var(--main-width);
    position: fixed;
    z-index:999;
    height: var(--ab-main-header-height);
    background-color: #fff;
    border-bottom:${props=>props.showHeaderBorder?'1px solid var(--ab-grey-200)':'0'};
  }
  .container{
    padding:0 2rem;
    width:var(--main-width);
    margin-top:var(--ab-main-header-height);
    display: flex;
  }

  .welcome{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin:0 auto;
    margin-top:20vh;
  }

  .cloud_header{
    padding:2rem 1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .cloud_container{
    padding:0;
  }
  
  .cloud_tool{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:1rem .5rem;
    h4{
      margin:0;
    }
  }
  
  .cloud_share{
    display: flex;
    column-gap:1rem;
  }

  .cloud_home{
    width:100%;
    margin-top:20vh;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;
  }

  .shared_header{
    padding:2rem 1rem;
    min-width: 350px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .shared_editor{
    display: flex;
    align-items: center;
    column-gap: .5rem;
  }

  .work_aside{
    text-align: center;
    padding:1rem .5rem;

    &>ul{
      margin:0;
      display: flex;
      flex-direction:column;
      row-gap:.5rem;
    }
  }

  .header.workspace{
    padding-left:1rem;
  }
  .work_item{
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &>small{
      cursor: pointer;
      transform:translateX(-6px);
    }

    &:hover{
      background-color: var(--ab-grey-200);
      border-radius: 5px;
      color:var(--ab-green-600);
    }
  }
  
  .work_item.active{
    background-color: var(--ab-green-600);
    border-radius: 5px;
    color:var(--ab-white-100);
  }
`;
