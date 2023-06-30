import styled from 'styled-components';


interface Props{
  asideWidth: string;
  showHeaderBorder?: boolean;
}

export const StyleDiv = styled('div') <Props>`
  --aside-width:${props => props.asideWidth};
  --main-width:calc(100% - var(--aside-width));

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
    width:var(--main-width);
    padding:0 2rem;
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
    padding:1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cloud_add{
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

  .shared_header{
    padding:1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .shared_editor{
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
`;
