import { Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Breadcrumbs = ({ links }) => {
  if(!links || links.length === 0) {
    return null;
  }
  return (
    <Breadcrumb>
      {
        links.map((link, index) => {
          if(index < links.length - 1) {
            return (
              <LinkContainer to={link.href || '#'} isActive={()=> false} key={index}>
                <Breadcrumb.Item active={(index === links.length - 1)}>
                {link.text}
                </Breadcrumb.Item>
              </LinkContainer>
            )
          }
          return (
            <Breadcrumb.Item active={true} key={index}>
              {link.text}
            </Breadcrumb.Item>
          )
        })
      }
    </Breadcrumb>
  )
}

export default Breadcrumbs