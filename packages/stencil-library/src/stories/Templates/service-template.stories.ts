import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Templates/Service Template',
  parameters: {
    layout: 'padded',
  },
} as Meta;

// Helper data objects
const yearsList = [
  { value: "2023-2022", isdisabled: false },
  { value: "2022-2021", isdisabled: false },
  { value: "2021-2020", isdisabled: false }
];

const documentData = {
  title: "TDS Certificate (Jul '23 - Sep '23)",
  styles: {
    title: { fontSize: "12px" },
    subTitle: { fontWeight: "400", fontSize: "10px" }
  },
  icon: {
    iconUrl: "https://img.icons8.com/?size=100&id=85101&format=png&color=4472C4",
    position: "left",
    style: { height: "24px", width: "24px" }
  },
  actions: [
    {
      iconUrl: "https://img.icons8.com/?size=100&id=98957&format=png&color=FF6700",
      style: { height: "20px", width: "20px" },
      event: "share"
    },
    {
      iconUrl: "https://img.icons8.com/?size=100&id=98961&format=png&color=FF6700",
      style: { height: "20px", width: "20px" },
      event: "download"
    }
  ]
};

const loanCardData = {
  type: 'card',
  badge: {
    text: 'Due in 7 days',
    variant: 'badge-success',
    position: 'top-left',
  },
  styles: {
    background: '#FFFFFF',
    marginTop: '20px',
    borderRadius: '12px',
    border: '1px solid #E0E0E0',
  },
  cardFields: [
    {
      type: 'text',
      label: 'iPhone 12',
      value: 'EMI amount',
      styles: {
        marginTop: '4px',
        marginBottom: '0px',
        label: {
          fontWeight: '600',
          fontSize: '14px',
          color: '#1A1A1A',
        },
        value: {
          fontSize: '10px',
          color: '#666666',
        },
      },
    },
    {
      type: 'text',
      label: 'Loan account number: CD402PSP727391',
      value: '₹5,000',
      styles: {
        marginBottom: '12px',
        label: {
          fontSize: '10px',
          color: '#666666',
        },
        value: {
          fontSize: '10px',
          fontWeight: '600',
          color: '#1A1A1A',
        },
      },
    },
    {
      type: 'divider',
      containerStyle: {
        margin: '12px 0',
        borderTop: '1px solid #E0E0E0',
      },
    },
    {
      type: 'grid',
      columns: '3',
      rows: 1,
      minColumnWidth: '100px',
      gridConfig: {
        gap: '10px 0',
      },
      data: [
        {
          url: 'https://img.icons8.com/?size=100&id=85101&format=png&color=4472C4',
          label: 'Statement of account',
          event: 'statementClick',
          styles: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            margin: '16px 16px 0px 16px',
            objectFit: 'cover',
            cursor: 'pointer',
            label: {
              fontSize: '10px',
            }
          },
        },
        {
          url: 'https://img.icons8.com/?size=100&id=98968&format=png&color=4472C4',
          label: 'View loan details',
          event: 'viewDetailsClick',
          styles: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            margin: '16px 16px 0px 16px',
            objectFit: 'cover',
            cursor: 'pointer',
            label: {
              fontSize: '10px',
            }
          },
        },
        {
          url: 'https://img.icons8.com/?size=100&id=85500&format=png&color=4472C4',
          label: 'Make payment',
          event: 'paymentClick',
          styles: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            margin: '16px 16px 0px 16px',
            objectFit: 'cover',
            cursor: 'pointer',
            label: {
              fontSize: '10px',
            }
          },
        },
      ],
    },
  ],
};

const tabsConfig = [
  { value: 'Settlement', label: 'Settlement' },
  { value: 'Overdue', label: 'Overdue' },
  { value: 'Other Payment', label: 'Other Payment' }
];

const timeSlots = [
  { value: '08:00 AM - 10:00 AM', label: '08:00 AM - 10:00 AM' },
  { value: '10:00 AM - 12:00 PM', label: '10:00 AM - 12:00 PM' },
  { value: '12:00 PM - 02:00 PM', label: '12:00 PM - 02:00 PM' },
  { value: '02:00 PM - 04:00 PM', label: '02:00 PM - 04:00 PM' },
  { value: '04:00 PM - 06:00 PM', label: '04:00 PM - 06:00 PM' },
  { value: '06:00 PM - 07:00 PM', label: '06:00 PM - 07:00 PM' }
];

const faqItems = [
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    content: 'Lorem ipsum dolor sit amet consectetur. Eu ipsum sit adipiscing est tellus egestas viverra. Purus odio facilisi accumsan cras vitae. Id sagittis amet posuere egestas at. Varius vestibulum sit aliquet lacinia commodo diam.',
    videoText: 'Watch Video',
    expanded: true
  },
  {
    title: 'How do I download my TDS certificate?',
    content: 'Select the financial year and quarter, then click the download icon next to the certificate you want to download.',
    expanded: false
  },
  {
    title: 'What are the payment options available?',
    content: 'You can make payments through our online portal, auto-debit, or visit any branch location.',
    expanded: false
  },
  {
    title: 'How can I view my loan statement?',
    content: 'Click on the "Statement of account" icon in your loan card to view or download your statement.',
    expanded: false
  },
  {
    title: 'When will I be contacted for overdue payments?',
    content: 'Our partner agency will contact you during your selected time slot until your overdue amount is cleared.',
    expanded: false,
    isDisabled: true
  }
];

// Template Stories
const TDSCertificateTemplate: StoryFn = () => html`
  <bfl-drawer-layout @close="${action('drawer-closed')}">
    <bfl-container-layout .Styles="${{
      'padding-left': '16px',
      'padding-right': '16px',
      'padding-top': '20px',
      'padding-bottom': '12px'
    }}">
      <bfl-stack-layout orientation="vertical" gap="16px">
        <bfl-stack-layout orientation="vertical" gap="4px">
          <bfl-container-layout .Styles="${{
            'display': 'flex',
            'justifyContent': 'center',
            'alignItems': 'center'
          }}">
            <bfl-span-text text="Download TDS Certificate" fontSize="18px"></bfl-span-text>
          </bfl-container-layout>
          <bfl-span-text 
            text="Select the financial year and quarter for the TDS certificate issued to your PAN." 
            fontSize="12px">
          </bfl-span-text>
        </bfl-stack-layout>

        <bfl-radiochip-input
          label=""
          .value="${'2023-2022'}"
          .inputList="${yearsList}"
          chipSize="small"
          @inputChanged="${action('year-selected')}">
        </bfl-radiochip-input>

        <bfl-document .document="${documentData}" @actionClick="${action('document-action')}"></bfl-document>
        <bfl-document .document="${documentData}" @actionClick="${action('document-action')}"></bfl-document>
        <bfl-document .document="${documentData}" @actionClick="${action('document-action')}"></bfl-document>
      </bfl-stack-layout>
    </bfl-container-layout>
  </bfl-drawer-layout>
`;

const LoanPaymentsTemplate: StoryFn = () => html`
  <bfl-drawer-layout @close="${action('drawer-closed')}">
    <bfl-container-layout .Styles="${{
      'padding-left': '16px',
      'padding-right': '16px',
      'padding-top': '20px',
      'padding-bottom': '12px'
    }}">
      <bfl-stack-layout orientation="vertical" gap="20px">
        <bfl-span-text text="Make loan payments" fontSize="20px"></bfl-span-text>
        
        <bfl-tab-group 
          .tabs="${tabsConfig}" 
          selectedTabColor="#FF6700" 
          unselectedTabColor="#002953" 
          headerAlignment="left" 
          .animated="${true}" 
          position="top" 
          tabGap="40px" 
          indicatorGap="8px"
          @tabChanged="${action('tab-changed')}">
          <bfl-tab value="Settlement">
            <bfl-card .cardData="${loanCardData}" @cardAction="${action('card-action')}"></bfl-card>
          </bfl-tab>
          <bfl-tab value="Overdue">
            <bfl-card .cardData="${loanCardData}" @cardAction="${action('card-action')}"></bfl-card>
          </bfl-tab>
          <bfl-tab value="Other Payment">
            <div style="padding: 20px;">
              <h3>Other Payment</h3>
              <p>Content for Other Payment tab.</p>
            </div>
          </bfl-tab>
        </bfl-tab-group>

        <bfl-container-layout .Styles="${{
          'display': 'flex',
          'justifyContent': 'center',
          'alignItems': 'center'
        }}">
          <bfl-cta-link
            text="View all"
            fontSize="16px"
            color="#FF6700"
            iconUrl="https://img.icons8.com/?size=100&id=98968&format=png&color=FF6700"
            gap="12px"
            @onLinkClick="${action('view-all-clicked')}">
          </bfl-cta-link>
        </bfl-container-layout>
      </bfl-stack-layout>
    </bfl-container-layout>
  </bfl-drawer-layout>
`;

const EMIBreakupTemplate: StoryFn = () => html`
  <bfl-drawer-layout @close="${action('drawer-closed')}">
    <bfl-container-layout .Styles="${{
      'padding-left': '16px',
      'padding-right': '16px',
      'padding-top': '20px',
      'padding-bottom': '12px'
    }}">
      <bfl-stack-layout orientation="vertical" gap="20px">
        <bfl-container-layout .Styles="${{
          'display': 'flex',
          'justifyContent': 'center',
          'alignItems': 'center'
        }}">
          <bfl-span-text text="First EMI break-up" fontSize="18px"></bfl-span-text>
        </bfl-container-layout>
        
        <bfl-container-layout>
          <card-text
            type="text"
            label="EMI Amount"
            value="₹2,000.00"
            .infoIcon="${false}"
            .styles="${{}}">
          </card-text>
          <card-text
            type="text"
            label="EMI Due Date"
            value="02 Aug 2024"
            .infoIcon="${false}"
            .styles="${{}}">
          </card-text>
        </bfl-container-layout>
        
        <bfl-divider
          .styles="${{borderTopStyle:'dashed',borderTopWidth:'2px',borderTopColor:'#C3C3C3'}}">
        </bfl-divider>
        
        <bfl-stack-layout gap="16px">
          <bfl-container-layout>
            <card-text
              type="subHeader"
              label="One-time charge (if cleared)"
              .infoIcon="${false}"
              .styles="${{}}">
            </card-text>
          </bfl-container-layout>
          
          <bfl-container-layout>
            <card-text
              type="text"
              label="CIBIL report fees"
              value="₹36.00"
              .infoIcon="${false}"
              .styles="${{}}">
            </card-text>
            <card-text
              type="text"
              label="Processing fees 1st EMI"
              value="₹117.00"
              .infoIcon="${false}"
              .styles="${{}}">
            </card-text>
          </bfl-container-layout>
          
          <card-text
            type="header"
            label="If the one-time charge is not cleared in this payment, it will be levied on the next EMI as an overdue."
            icon="https://static.vecteezy.com/system/resources/previews/010/110/176/original/idea-flat-icon-photography-and-digital-art-flat-design-vector.jpg"
            .styles="${{background:'#F2F2F2',borderRadius:'4px'}}">
          </card-text>
        </bfl-stack-layout>
        
        <bfl-divider
          .styles="${{borderTopStyle:'dashed',borderTopWidth:'2px',borderTopColor:'#C3C3C3'}}">
        </bfl-divider>

        <card-text
          type="subHeader"
          label="Total amount to be paid"
          value="₹2153.00"
          .infoIcon="${false}"
          .styles="${{}}">
        </card-text>

        <bfl-container-layout .Styles="${{
          'display': 'flex',
          'justifyContent': 'center',
          'alignItems': 'center'
        }}">
          <bfl-container-layout .Styles="${{width: '167px'}}">
            <bfl-cta-button
              type="gradient"
              label="Got It"
              name="b1"
              submitId="ctaButtonClick"
              .isSubmit="${false}"
              @buttonClick="${action('got-it')}">
            </bfl-cta-button>
          </bfl-container-layout>
        </bfl-container-layout>
      </bfl-stack-layout>
    </bfl-container-layout>
  </bfl-drawer-layout>
`;

const TimeSlotTemplate: StoryFn = () => html`
  <bfl-container-layout .Styles="${{
    'padding-left': '16px',
    'padding-right': '16px',
    'padding-top': '20px',
    'padding-bottom': '12px'
  }}">
    <bfl-stack-layout orientation="vertical" gap="16px">
      <bfl-container-layout>
        <bfl-span-text text="Select time slot" fontSize="18px" fontWeight="600"></bfl-span-text>
        <bfl-span-text 
          text="Our partner agency will contact you during your selected time slot until your overdue amount is cleared." 
          fontSize="14px" 
          fontWeight="400"
          fontStyle="Italic"
          textColor="#00695C">
        </bfl-span-text>
      </bfl-container-layout>
      
      <bfl-radio-group .value="${'08:00 AM - 10:00 AM'}" @valueChanged="${action('time-slot-selected')}">
        <bfl-stack-layout orientation="vertical" gap="8px">
          ${timeSlots.map(slot => html`
            <bfl-radio-child-input .value="${slot.value}">
              <bfl-span-text .text="${slot.label}" fontSize="16px" fontWeight="500"></bfl-span-text>
            </bfl-radio-child-input>
          `)}
        </bfl-stack-layout>
      </bfl-radio-group>
    </bfl-stack-layout>
  </bfl-container-layout>
`;

const FAQTemplate: StoryFn = () => html`
  <bfl-container-layout .Styles="${{
    'padding-left': '16px',
    'padding-right': '16px',
    'padding-top': '20px',
    'padding-bottom': '12px'
  }}">
    <bfl-stack-layout orientation="vertical" gap="20px">
      <bfl-span-text text="Frequently asked questions" fontSize="16px" fontWeight="600"></bfl-span-text>
      
      <bfl-accordian>
        ${faqItems.map(faq => html`
          <bfl-accordian-panel 
            .title="${faq.title}"
            .expanded="${faq.expanded}"
            .disabled="${faq.isDisabled}"
            .styles="${{ backgroundColor: '#F2F4FB' }}"
            variant="bordered"
            @opened="${action('faq-opened')}"
            @closed="${action('faq-closed')}">
            <bfl-stack-layout orientation="vertical" gap="12px">
              ${faq.content ? html`
                <bfl-para-text 
                  .text="${faq.content}" 
                  fontSize="14px"
                  fontWeight="400"
                  textColor="#5C6470">
                </bfl-para-text>
              ` : ''}
              
              ${faq.videoText ? html`
                <bfl-container-layout .Styles="${{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%'
                }}">
                  <bfl-cta-link 
                    text="Watch Video"
                    iconUrl="https://img.icons8.com/?size=100&id=53435&format=png&color=FF6700"
                    position="right"
                    color="#FF6700"
                    fontSize="14px"
                    fontWeight="500"
                    gap="4px"
                    @onLinkClick="${action('watch-video')}">
                  </bfl-cta-link>
                </bfl-container-layout>
              ` : ''}
            </bfl-stack-layout>
          </bfl-accordian-panel>
        `)}
      </bfl-accordian>
      
      <bfl-container-layout .Styles="${{
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
      }}">
        <bfl-cta-link 
          text="Show more"
          iconUrl="https://img.icons8.com/?size=100&id=98968&format=png&color=FF6700"
          position="left"
          color="#FF6700"
          fontSize="14px"
          fontWeight="500"
          gap="4px"
          @onLinkClick="${action('show-more')}">
        </bfl-cta-link>
      </bfl-container-layout>
    </bfl-stack-layout>
  </bfl-container-layout>
`;

// Export Stories
export const TDSCertificate = TDSCertificateTemplate.bind({});
TDSCertificate.storyName = '1. TDS Certificate Download';
TDSCertificate.parameters = {
  docs: {
    source: {
      code: `<bfl-drawer-layout (close)="onDrawerClose()">
  <bfl-container-layout [Styles]="{
    'padding-left': '16px',
    'padding-right': '16px',
    'padding-top': '20px',
    'padding-bottom': '12px'
  }">
    <bfl-stack-layout orientation="vertical" gap="16px">
      <bfl-stack-layout orientation="vertical" gap="4px">
        <bfl-container-layout [Styles]="{
          'display': 'flex',
          'justifyContent': 'center',
          'alignItems': 'center'
        }">
          <bfl-span-text text="Download TDS Certificate" fontSize="18px"></bfl-span-text>
        </bfl-container-layout>
        <bfl-span-text 
          text="Select the financial year and quarter for the TDS certificate issued to your PAN." 
          fontSize="12px">
        </bfl-span-text>
      </bfl-stack-layout>

      <bfl-radiochip-input
        label=""
        [value]="'2023-2022'"
        [inputList]='yearsList'
        chipSize="small">
      </bfl-radiochip-input>
    </bfl-stack-layout>

    <bfl-document [document]='documentData'></bfl-document>
    <bfl-document [document]='documentData'></bfl-document>
    <bfl-document [document]='documentData'></bfl-document>
  </bfl-container-layout>
</bfl-drawer-layout>`,
      language: 'html',
    },
  },
};

export const LoanPayments = LoanPaymentsTemplate.bind({});
LoanPayments.storyName = '2. Loan Payment Interface';
LoanPayments.parameters = {
  docs: {
    source: {
      code: `<bfl-drawer-layout (close)="onDrawerClose()">
  <bfl-container-layout [Styles]="drawerContainerStyles">
    <bfl-stack-layout orientation="vertical" gap="20px">
      <bfl-span-text text="Make loan payments" fontSize="20px"></bfl-span-text>
      
      <bfl-tab-group 
        [tabs]='tabsConfig' 
        selectedTabColor="#FF6700" 
        unselectedTabColor="#002953" 
        headerAlignment="left" 
        [animated]="true" 
        position="top" 
        tabGap="40px" 
        indicatorGap="8px" 
        [styles]='tabGroupStyles'>
        
        <bfl-tab value="Settlement">
          <bfl-card [cardData]="loanCardData"></bfl-card>
        </bfl-tab>
        
        <bfl-tab value="Overdue">
          <bfl-card [cardData]="loanCardData"></bfl-card>
        </bfl-tab>
        
        <bfl-tab value="Other Payment">
          <div style="padding: 20px;">
            <h3>Other Payment</h3>
            <p>Content for Other Payment tab.</p>
          </div>
        </bfl-tab>
      </bfl-tab-group>

      <bfl-container-layout [Styles]="ctaContainerStyles">
        <bfl-cta-link
          text="View all"
          fontSize="16px"
          color="#FF6700"
          iconUrl="https://cdn1.iconfinder.com/data/icons/outline-web-application-2/24/arrow-right-512.png"
          gap="12px">
        </bfl-cta-link>
      </bfl-container-layout>
    </bfl-stack-layout>
  </bfl-container-layout>
</bfl-drawer-layout>`,
      language: 'html',
    },
  },
};

export const EMIBreakup = EMIBreakupTemplate.bind({});
EMIBreakup.storyName = '3. EMI Breakup Display';
EMIBreakup.parameters = {
  docs: {
    source: {
      code: `<bfl-drawer-layout (close)="onDrawerClose()">
  <bfl-container-layout [Styles]="drawerContainerStyles">
    <bfl-stack-layout orientation="vertical" gap="20px">
      <bfl-container-layout [Styles]="{
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
      }">      
        <bfl-span-text text="First EMI break-up" fontSize="18px"></bfl-span-text>
      </bfl-container-layout>
      
      <bfl-container-layout>
        <card-text
          type="text"
          label="EMI Amount"
          value="₹2,000.00"
          [infoIcon]="false"
          [styles]='{}'>
        </card-text>
        <card-text
          type="text"
          label="EMI Due Date"
          value="02 Aug 2024"
          [infoIcon]="false"
          [styles]='{}'>
        </card-text>
      </bfl-container-layout>
      
      <bfl-divider
        [styles]='{"borderTopStyle":"dashed","borderTopWidth":"2px","borderTopColor":"#C3C3C3"}'>
      </bfl-divider>
      
      <bfl-stack-layout gap="16px">
        <bfl-container-layout>
          <card-text
            type="subHeader"
            label="One-time charge (if cleared)"
            [infoIcon]="false"
            [styles]='{}'>
          </card-text>
        </bfl-container-layout>
        
        <bfl-container-layout>
          <card-text
            type="text"
            label="CIBIL report fees"
            value="₹36.00"
            [infoIcon]="false"
            [styles]='{}'>
          </card-text>
          <card-text
            type="text"
            label="Processing fees 1st EMI"
            value="₹117.00"
            [infoIcon]="false"
            [styles]='{}'>
          </card-text>
        </bfl-container-layout>
        
        <card-text
          type="header"
          label="If the one-time charge is not cleared in this payment, it will be levied on the next EMI as an overdue."
          icon="https://static.vecteezy.com/system/resources/previews/010/110/176/original/idea-flat-icon-photography-and-digital-art-flat-design-vector.jpg"
          [styles]='{"background":"Neutrals/Gray_Grey_95-#F2F2F2","borderRadius":"4px"}'>
        </card-text>
      </bfl-stack-layout>
      
      <bfl-divider
        [styles]='{"borderTopStyle":"dashed","borderTopWidth":"2px","borderTopColor":"#C3C3C3"}'>
      </bfl-divider>

      <card-text
        type="subHeader"
        label="Total amount to be paid"
        value="₹2153.00"
        [infoIcon]="false"
        [styles]='{}'>
      </card-text>

      <bfl-container-layout [Styles]="{
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
      }">  
        <bfl-container-layout [Styles]="{
          'width': '167px'
        }">
          <bfl-cta-button
            type="gradient"
            label="Got It"
            name="b1"
            submitId="ctaButtonClick"
            [isSubmit]="false">
          </bfl-cta-button>
        </bfl-container-layout>
      </bfl-container-layout>
    </bfl-stack-layout>
  </bfl-container-layout>
</bfl-drawer-layout>`,
      language: 'html',
    },
  },
};

export const TimeSlotSelection = TimeSlotTemplate.bind({});
TimeSlotSelection.storyName = '4. Time Slot Selection';
TimeSlotSelection.parameters = {
  docs: {
    source: {
      code: `<bfl-container-layout [Styles]="drawerContainerStyles">
  <bfl-stack-layout orientation="vertical" gap="16px">
    <bfl-container-layout>
      <bfl-span-text text="Select time slot" fontSize="18px" fontWeight="600"></bfl-span-text>
      <bfl-span-text 
        text="Our partner agency will contact you during your selected time slot until your overdue amount is cleared." 
        fontSize="14px" 
        fontWeight="400"
        fontStyle="Italic"
        textColor="#00695C">
      </bfl-span-text>
    </bfl-container-layout>
    
    <bfl-radio-group [value]="selectedTimeSlot">
      <bfl-stack-layout orientation="vertical" gap="8px">
        <bfl-radio-child-input 
          *ngFor="let slot of timeSlots" 
          [value]="slot.value">
          <bfl-span-text [text]="slot.label" fontSize="16px" fontWeight="500"></bfl-span-text>
        </bfl-radio-child-input>
      </bfl-stack-layout>
    </bfl-radio-group>
  </bfl-stack-layout>
</bfl-container-layout>`,
      language: 'html',
    },
  },
};

export const FAQSection = FAQTemplate.bind({});
FAQSection.storyName = '5. FAQ Section';
FAQSection.parameters = {
  docs: {
    source: {
      code: `<bfl-container-layout [Styles]="drawerContainerStyles">
  <bfl-stack-layout orientation="vertical" gap="20px">
    <bfl-span-text text="Frequently asked questions" fontSize="16px" fontWeight="600"></bfl-span-text>
    
    <bfl-accordian>
      <bfl-accordian-panel 
        *ngFor="let faq of faqItems"
        [title]="faq.title"
        [expanded]="faq.expanded"
        [disabled]="faq.isDisabled"
        [styles]="accordionPanelStyles"
        variant="bordered">
        <bfl-stack-layout orientation="vertical" gap="12px">
          <bfl-para-text 
            *ngIf="faq.content"
            [text]="faq.content" 
            fontSize="14px"
            fontWeight="400"
            textColor="#5C6470">
          </bfl-para-text>
          
          <bfl-container-layout 
            *ngIf="faq.videoText"
            [Styles]="videoLinkContainerStyles">
            <bfl-cta-link 
              text="Watch Video"
              iconUrl="https://tse4.mm.bing.net/th/id/OIP.gm9XNHZdQvzIHZj5iOl5kgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              position="right"
              color="#FF6700"
              fontSize="14px"
              fontWeight="500"
              gap="4px">
            </bfl-cta-link>
          </bfl-container-layout>
        </bfl-stack-layout>
      </bfl-accordian-panel>
    </bfl-accordian>
    
    <bfl-container-layout [Styles]="{
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center'
    }">
      <bfl-cta-link 
        text="Show more"
        iconUrl="https://static.vecteezy.com/system/resources/previews/006/827/566/non_2x/down-arrow-icon-sign-symbol-logo-vector.jpg"
        position="left"
        color="#FF6700"
        fontSize="14px"
        fontWeight="500"
        gap="4px">
      </bfl-cta-link>
    </bfl-container-layout>
  </bfl-stack-layout>
</bfl-container-layout>`,
      language: 'html',
    },
  },
};
