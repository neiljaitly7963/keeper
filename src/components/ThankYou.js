import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Jumbotron } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';
import appConfig from '../utility/appConfig';

import {
  WebPageLayout,
  OnePartLayout,
  TwoPartsLayout,
  BigContainer,
  SmallContainer,
  MobilePageLayout,
  MobileDetailsContainer,
  MobileItemsContainer,
  FooterContainer,
} from './layout/PageLayouts';
import CustomerNameHeading from './Headings/CustomerNameHeading';
import ScrollIndicator from './ScrollIndicator';
import AddressDetails from './AddressDetails';
import MobileLogo from './MobileLogo';
import TotalPrice from './TotalPrice';
import ItemsPageHeader from './ItemsPageHeader';
import ItemTable from './ItemsTable/ItemsTable';
import TotalCostBox from './TotalCostBox';
import WebFooter from './Footer/WebFooter';
import MobileFooter from './Footer/MobileFooter';
import YourOrderHeading from './YourOrderHeading';

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: true,
    };
    this.handleThrottledResize = debounce(this.handleResize, 200);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleThrottledResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleThrottledResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 1000 });
  };

  render() {
    const { isMobile } = this.state;
    const { order } = this.props;
    return (
      <>
        {isMobile === false ? (
          <WebPageLayout>
            <TwoPartsLayout>
              <SmallContainer>
                <CustomerNameHeading order={order} viewPage="thankYou" />
                <ScrollIndicator />
                <span style={{ color: '#000000', fontSize: '36px', fontWeight: '500' }}>
                  <FormattedMessage
                    id="ThankYou.Heading"
                    defaultMessage="Thank you from the store"
                  />
                </span>
                <br />
                <span style={{ fontSize: '14px', fontWeight: '400' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida sapien
                  quis quam efficitur, vitae condimentum nisi eleifend. Vestibulum ultrices, tellus
                  sit amet consectetur ultrices, felis velit tristique ante, id eleifend lectus
                  risus eu nibh. Ut dignissim ipsum a pellentesque imperdiet. Sed quis laoreet nisl,
                  sed lacinia nibh. Integer efficitur porta elit id malesuada. Mauris lorem augue,
                  rhoncus et semper id, semper id orci. Cras molestie ligula ligula, at viverra
                  risus facilisis eget. Integer tincidunt sollicitudin neque ut vulputate. Aliquam
                  est metus, sollicitudin nec venenatis nec, commodo a mi.
                </span>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      borderRadius: '15px',
                      width: '530px',
                      height: '298px',
                      background: 'grey',
                      marginTop: '30px',
                    }}
                  />
                </div>
              </SmallContainer>
              <FooterContainer>
                <WebFooter />
              </FooterContainer>
            </TwoPartsLayout>
            <OnePartLayout>
              <BigContainer>
                <ItemsPageHeader order={order} />
                <AddressDetails />
                <ItemTable viewType="web" />
                <TotalCostBox order={order} />
              </BigContainer>
            </OnePartLayout>
          </WebPageLayout>
        ) : (
          <MobilePageLayout>
            <MobileDetailsContainer style={{ height: '460px' }}>
              <MobileLogo />
              <CustomerNameHeading order={order} viewPage="thankYou" />
              <AddressDetails />

              <YourOrderHeading />
            </MobileDetailsContainer>
            <MobileItemsContainer>
              <ItemTable viewType="mobile" orderNumber={order.number} />
              <TotalCostBox order={order} />
            </MobileItemsContainer>
            <FooterContainer>
              <MobileFooter order={order} />
            </FooterContainer>
          </MobilePageLayout>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
});

export default connect(mapStateToProps)(ThankYou);
