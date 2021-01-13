import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Container, Jumbotron } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
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
import FormHeading from './Headings/FormHeading';
import ScrollIndicator from './ScrollIndicator';
import MobileLogo from './MobileLogo';
import TotalPrice from './TotalPrice';
import ItemsPageHeader from './ItemsPageHeader';
import ItemTable from './ItemsTable/ItemsTable';
import TotalCostBox from './TotalCostBox';
import WebFooter from './Footer/WebFooter';
import MobileFooter from './Footer/MobileFooter';
import YourOrderHeading from './YourOrderHeading';

import OrderAddressRow from './OrderAddressRow';
import OrderDetails from './OrderDetails';
import OrderSummary from './OrderSummary';
import OrderPayments from './OrderPayments';
import OrderCompleteButton from './buttons/OrderCompleteButton';

import OrderAddressEditModalTest from './modals/OrderAddressEditModalTest';
import OrderAddressEditModal from './modals/OrderAddressEditModal';
import { getAddressFromOrder } from '../utility/address';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      showFullOrder: false,
      modalShown: false,
      isBilling: false,
    };
    this.handleThrottledResize = debounce(this.handleResize, 200);
  }

  componentDidMount() {
    this.handleResize();
    console.log(window.innerHeight, 'window.innerHeight');
    window.addEventListener('resize', this.handleThrottledResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleThrottledResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 1000 }, () => console.log('hi neil'));
  };

  hideFullOrder() {
    this.setState({ showFullOrder: false });
  }

  showFullOrder() {
    this.setState({ showFullOrder: true });
  }

  closeModal() {
    this.setState({ modalShown: false });
  }

  render() {
    const { order } = this.props;
    const { isMobile, modalShown, isBilling } = this.state;
    const address = getAddressFromOrder(order, false);
    return (
      <>
        {isMobile === false ? (
          <WebPageLayout>
            <OnePartLayout>
              <BigContainer>
                <CustomerNameHeading order={order} viewPage="create" />

                <ScrollIndicator />
                <FormHeading>Jouw gegevens</FormHeading>

                <OrderAddressEditModal
                  modalShown
                  isBilling={false}
                  address={address}
                  closeModal={() => this.closeModal()}
                />

                <OrderPayments />

                <OrderCompleteButton />
              </BigContainer>
            </OnePartLayout>
            <TwoPartsLayout>
              <SmallContainer>
                <ItemsPageHeader order={order} />
                <ItemTable viewType="web" />
                <TotalCostBox order={order} />
              </SmallContainer>
              <FooterContainer>
                <WebFooter />
              </FooterContainer>
            </TwoPartsLayout>
          </WebPageLayout>
        ) : (
          <MobilePageLayout>
            <MobileDetailsContainer>
              <MobileLogo />
              <CustomerNameHeading order={order} viewPage="create" />
              <OrderAddressEditModal
                modalShown
                isBilling={false}
                address={address}
                closeModal={() => this.closeModal()}
              />

              <OrderPayments />
              <OrderCompleteButton />

              <YourOrderHeading />
            </MobileDetailsContainer>
            <MobileItemsContainer>
              <ItemTable viewType="mobile" />
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
  hasOrder: !!state.getOrder.sync,
  order: state.getOrder.data,
});

export default connect(mapStateToProps)(Create);
