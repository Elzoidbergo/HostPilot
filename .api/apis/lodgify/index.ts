import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'lodgify/v1 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Returns a list of all the available countries
   *
   * @summary Countries Codes
   * @throws FetchError<400, types.GetV1CountriesResponse400> Bad Request
   * @throws FetchError<401, types.GetV1CountriesResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1CountriesResponse404> Not Found
   * @throws FetchError<500, types.GetV1CountriesResponse500> Server Error
   */
  getV1Countries(): Promise<FetchResponse<200, types.GetV1CountriesResponse200>> {
    return this.core.fetch('/v1/countries', 'get');
  }

  /**
   * Returns a country by given his code
   *
   * @summary Country by code
   * @throws FetchError<400, types.GetV1CountriesCodeResponse400> Bad Request
   * @throws FetchError<401, types.GetV1CountriesCodeResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1CountriesCodeResponse404> Not Found
   * @throws FetchError<500, types.GetV1CountriesCodeResponse500> Server Error
   */
  getV1CountriesCode(metadata: types.GetV1CountriesCodeMetadataParam): Promise<FetchResponse<200, types.GetV1CountriesCodeResponse200>> {
    return this.core.fetch('/v1/countries/{code}', 'get', metadata);
  }

  /**
   * Returns a list of available currencies in Lodgify
   *
   * @summary Currencies codes
   * @throws FetchError<400, types.GetV1CurrenciesResponse400> Bad Request
   * @throws FetchError<401, types.GetV1CurrenciesResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1CurrenciesResponse404> Not Found
   * @throws FetchError<500, types.GetV1CurrenciesResponse500> Server Error
   */
  getV1Currencies(): Promise<FetchResponse<200, types.GetV1CurrenciesResponse200>> {
    return this.core.fetch('/v1/currencies', 'get');
  }

  /**
   * Returns the currency with the given code
   *
   * @summary Currency by code
   * @throws FetchError<400, types.GetV1CurrenciesCodeResponse400> Bad Request
   * @throws FetchError<401, types.GetV1CurrenciesCodeResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1CurrenciesCodeResponse404> Not Found
   * @throws FetchError<500, types.GetV1CurrenciesCodeResponse500> Server Error
   */
  getV1CurrenciesCode(metadata: types.GetV1CurrenciesCodeMetadataParam): Promise<FetchResponse<200, types.GetV1CurrenciesCodeResponse200>> {
    return this.core.fetch('/v1/currencies/{code}', 'get', metadata);
  }

  /**
   * Gets the Channel Xml file for all the users with this channel enabled or empty string if
   * not exists
   *
   * @summary Lists channels for OTAs
   * @throws FetchError<400, types.GetV1ChannelXmlResponse400> Bad Request
   * @throws FetchError<401, types.GetV1ChannelXmlResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1ChannelXmlResponse404> Not Found
   * @throws FetchError<500, types.GetV1ChannelXmlResponse500> Server Error
   */
  getV1ChannelXml(): Promise<FetchResponse<200, types.GetV1ChannelXmlResponse200>> {
    return this.core.fetch('/v1/channel/xml', 'get');
  }

  /**
   * Gets the list of property rates modified since the date passed, for the user the channel
   * is impersonating
   *
   * @summary Property rates
   * @throws FetchError<400, types.GetV1ChannelRatesResponse400> Bad Request
   * @throws FetchError<401, types.GetV1ChannelRatesResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1ChannelRatesResponse404> Not Found
   * @throws FetchError<500, types.GetV1ChannelRatesResponse500> Server Error
   */
  getV1ChannelRates(metadata?: types.GetV1ChannelRatesMetadataParam): Promise<FetchResponse<200, types.GetV1ChannelRatesResponse200>> {
    return this.core.fetch('/v1/channel/rates', 'get', metadata);
  }

  /**
   * Returns the list of completed properties for a given user. This is a protected endpoint.
   *
   * @summary Properties info list
   * @throws FetchError<400, types.ListPropertiesResponse400> Bad Request
   * @throws FetchError<401, types.ListPropertiesResponse401> Unauthorized
   * @throws FetchError<404, types.ListPropertiesResponse404> Not Found
   * @throws FetchError<500, types.ListPropertiesResponse500> Server Error
   */
  listProperties(metadata?: types.ListPropertiesMetadataParam): Promise<FetchResponse<200, types.ListPropertiesResponse200>> {
    return this.core.fetch('/v1/properties', 'get', metadata);
  }

  /**
   * Get the basic info for a given property
   *
   * @summary Property info by id
   * @throws FetchError<400, types.GetPropertyByIdResponse400> Bad Request
   * @throws FetchError<401, types.GetPropertyByIdResponse401> Unauthorized
   * @throws FetchError<404, types.GetPropertyByIdResponse404> Not Found
   * @throws FetchError<500, types.GetPropertyByIdResponse500> Server Error
   */
  getPropertyById(metadata: types.GetPropertyByIdMetadataParam): Promise<FetchResponse<200, types.GetPropertyByIdResponse200>> {
    return this.core.fetch('/v1/properties/{id}', 'get', metadata);
  }

  /**
   * Returns details for a given room in a property
   *
   * @summary Room info in a property by id
   * @throws FetchError<400, types.GetV1PropertiesIdRoomsRidResponse400> Bad Request
   * @throws FetchError<401, types.GetV1PropertiesIdRoomsRidResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1PropertiesIdRoomsRidResponse404> Not Found
   * @throws FetchError<500, types.GetV1PropertiesIdRoomsRidResponse500> Server Error
   */
  getV1PropertiesIdRoomsRid(metadata: types.GetV1PropertiesIdRoomsRidMetadataParam): Promise<FetchResponse<200, types.GetV1PropertiesIdRoomsRidResponse200>> {
    return this.core.fetch('/v1/properties/{id}/rooms/{rid}', 'get', metadata);
  }

  /**
   * Returns a list of available addons for the given property. If additional parameters are
   * specified, then it'll return only those that are valid
   *
   * @summary Available addons
   * @throws FetchError<400, types.GetV1PropertiesIdRatesAddonsResponse400> Bad Request
   * @throws FetchError<401, types.GetV1PropertiesIdRatesAddonsResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1PropertiesIdRatesAddonsResponse404> Not Found
   * @throws FetchError<500, types.GetV1PropertiesIdRatesAddonsResponse500> Server Error
   */
  getV1PropertiesIdRatesAddons(metadata: types.GetV1PropertiesIdRatesAddonsMetadataParam): Promise<FetchResponse<200, types.GetV1PropertiesIdRatesAddonsResponse200>> {
    return this.core.fetch('/v1/properties/{id}/rates/addons', 'get', metadata);
  }

  /**
   * Returns a list of available payments for a given property. This payment types are useful
   * when creating bookings
   *
   * @summary Available payments
   * @throws FetchError<400, types.GetV1PropertiesIdPaymentsResponse400> Bad Request
   * @throws FetchError<401, types.GetV1PropertiesIdPaymentsResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1PropertiesIdPaymentsResponse404> Not Found
   * @throws FetchError<500, types.GetV1PropertiesIdPaymentsResponse500> Server Error
   */
  getV1PropertiesIdPayments(metadata: types.GetV1PropertiesIdPaymentsMetadataParam): Promise<FetchResponse<200, types.GetV1PropertiesIdPaymentsResponse200>> {
    return this.core.fetch('/v1/properties/{id}/payments', 'get', metadata);
  }

  /**
   * Returns daily rates calendar for room types requested by roomTypeId or houseId.
   *
   * @summary Daily rates
   * @throws FetchError<400, types.RatesCalendarResponse400> Bad Request
   * @throws FetchError<401, types.RatesCalendarResponse401> Unauthorized
   * @throws FetchError<404, types.RatesCalendarResponse404> Not Found
   * @throws FetchError<500, types.RatesCalendarResponse500> Server Error
   */
  ratesCalendar(metadata: types.RatesCalendarMetadataParam): Promise<FetchResponse<200, types.RatesCalendarResponse200>> {
    return this.core.fetch('/v1/rates/calendar', 'get', metadata);
  }

  /**
   * Replaces the selected rates for specific room types with the new items and fills them
   * with availability information. To be used by 3rd party services that do not support
   * availability information.
   *
   * @summary Updates specific rates
   * @throws FetchError<400, types.SaveTinyResponse400> Bad Request
   * @throws FetchError<401, types.SaveTinyResponse401> Unauthorized
   * @throws FetchError<404, types.SaveTinyResponse404> Not Found
   * @throws FetchError<500, types.SaveTinyResponse500> Server Error
   */
  saveTiny(body?: types.SaveTinyBodyParam): Promise<FetchResponse<200, types.SaveTinyResponse200>> {
    return this.core.fetch('/v1/rates/savewithoutavailability', 'post', body);
  }

  /**
   * User's webhooks
   *
   * @throws FetchError<400, types.GetWebhooksV1ListResponse400> Bad Request
   * @throws FetchError<401, types.GetWebhooksV1ListResponse401> Unauthorized
   * @throws FetchError<404, types.GetWebhooksV1ListResponse404> Not Found
   * @throws FetchError<500, types.GetWebhooksV1ListResponse500> Server Error
   */
  getWebhooksV1List(): Promise<FetchResponse<200, types.GetWebhooksV1ListResponse200>> {
    return this.core.fetch('/webhooks/v1/list', 'get');
  }

  /**
   * Subscribes to a Lodgify webhook.
   *
   * @summary Subscribes to a webhook.
   * @throws FetchError<400, types.PostWebhooksV1SubscribeResponse400> Bad Request
   * @throws FetchError<401, types.PostWebhooksV1SubscribeResponse401> Unauthorized
   * @throws FetchError<404, types.PostWebhooksV1SubscribeResponse404> Not Found
   * @throws FetchError<409, types.PostWebhooksV1SubscribeResponse409> Conflict
   * @throws FetchError<500, types.PostWebhooksV1SubscribeResponse500> Server Error
   */
  postWebhooksV1Subscribe(body?: types.PostWebhooksV1SubscribeBodyParam): Promise<FetchResponse<201, types.PostWebhooksV1SubscribeResponse201>> {
    return this.core.fetch('/webhooks/v1/subscribe', 'post', body);
  }

  /**
   * Unsubscribes from a Lodgify webhook
   *
   * @summary Unsubscribes from a webhook
   * @throws FetchError<400, types.DeleteWebhooksV1UnsubscribeResponse400> Bad Request
   * @throws FetchError<401, types.DeleteWebhooksV1UnsubscribeResponse401> Unauthorized
   * @throws FetchError<404, types.DeleteWebhooksV1UnsubscribeResponse404> Not Found
   * @throws FetchError<500, types.DeleteWebhooksV1UnsubscribeResponse500> Server Error
   */
  deleteWebhooksV1Unsubscribe(body?: types.DeleteWebhooksV1UnsubscribeBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/webhooks/v1/unsubscribe', 'delete', body);
  }

  /**
   * Lists availability information for a given period for a specific room in a property of
   * the calling user.
   *
   * @summary Gets availability for a room
   * @throws FetchError<400, types.GetV1AvailabilityPropertyidRoomtypeidResponse400> Bad Request
   * @throws FetchError<401, types.GetV1AvailabilityPropertyidRoomtypeidResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1AvailabilityPropertyidRoomtypeidResponse404> Not Found
   * @throws FetchError<500, types.GetV1AvailabilityPropertyidRoomtypeidResponse500> Internal Server Error
   */
  getV1AvailabilityPropertyidRoomtypeid(metadata: types.GetV1AvailabilityPropertyidRoomtypeidMetadataParam): Promise<FetchResponse<200, types.GetV1AvailabilityPropertyidRoomtypeidResponse200>> {
    return this.core.fetch('/v1/availability/{propertyId}/{roomTypeId}', 'get', metadata);
  }

  /**
   * Lists availability information for a given period for a specific property of the calling
   * user.
   *
   * @summary Gets availability for a property
   * @throws FetchError<400, types.GetV1AvailabilityPropertyidResponse400> Bad Request
   * @throws FetchError<401, types.GetV1AvailabilityPropertyidResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1AvailabilityPropertyidResponse404> Not Found
   * @throws FetchError<500, types.GetV1AvailabilityPropertyidResponse500> Internal Server Error
   */
  getV1AvailabilityPropertyid(metadata: types.GetV1AvailabilityPropertyidMetadataParam): Promise<FetchResponse<200, types.GetV1AvailabilityPropertyidResponse200>> {
    return this.core.fetch('/v1/availability/{propertyId}', 'get', metadata);
  }

  /**
   * Lists availability information for a given period for the calling user.
   *
   * @summary Gets all availabilites
   * @throws FetchError<400, types.GetV1AvailabilityResponse400> Bad Request
   * @throws FetchError<401, types.GetV1AvailabilityResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1AvailabilityResponse404> Not Found
   * @throws FetchError<500, types.GetV1AvailabilityResponse500> Internal Server Error
   */
  getV1Availability(metadata?: types.GetV1AvailabilityMetadataParam): Promise<FetchResponse<200, types.GetV1AvailabilityResponse200>> {
    return this.core.fetch('/v1/availability', 'get', metadata);
  }

  /**
   * Sets the number of units available for a room type
   *
   * @summary Change units for a room
   * @throws FetchError<400, types.PostV1AvailabilityPropertyidRoomtypeidSetResponse400> Bad Request
   * @throws FetchError<401, types.PostV1AvailabilityPropertyidRoomtypeidSetResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1AvailabilityPropertyidRoomtypeidSetResponse404> Not Found
   * @throws FetchError<500, types.PostV1AvailabilityPropertyidRoomtypeidSetResponse500> Internal Server Error
   */
  postV1AvailabilityPropertyidRoomtypeidSet(body: types.PostV1AvailabilityPropertyidRoomtypeidSetBodyParam, metadata: types.PostV1AvailabilityPropertyidRoomtypeidSetMetadataParam): Promise<FetchResponse<number, unknown>>;
  postV1AvailabilityPropertyidRoomtypeidSet(metadata: types.PostV1AvailabilityPropertyidRoomtypeidSetMetadataParam): Promise<FetchResponse<number, unknown>>;
  postV1AvailabilityPropertyidRoomtypeidSet(body?: types.PostV1AvailabilityPropertyidRoomtypeidSetBodyParam | types.PostV1AvailabilityPropertyidRoomtypeidSetMetadataParam, metadata?: types.PostV1AvailabilityPropertyidRoomtypeidSetMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/availability/{propertyId}/{roomTypeId}/set', 'post', body, metadata);
  }

  /**
   * Returns a paged list of all the bookings and enquiries on the inbox
   *
   * @summary Bookings in the inbox
   * @throws FetchError<400, types.BookingsListResponse400> Bad Request
   * @throws FetchError<401, types.BookingsListResponse401> Unauthorized
   * @throws FetchError<404, types.BookingsListResponse404> Not Found
   * @throws FetchError<500, types.BookingsListResponse500> Internal Server Error
   */
  bookingsList(metadata?: types.BookingsListMetadataParam): Promise<FetchResponse<200, types.BookingsListResponse200>> {
    return this.core.fetch('/v1/reservation', 'get', metadata);
  }

  /**
   * Gets the number of non read Booking/Enquiry messages
   *
   * @summary Non read bookings/enquiries
   * @throws FetchError<400, types.GetV1ReservationNotReadResponse400> Bad Request
   * @throws FetchError<401, types.GetV1ReservationNotReadResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1ReservationNotReadResponse404> Not Found
   * @throws FetchError<500, types.GetV1ReservationNotReadResponse500> Internal Server Error
   */
  getV1ReservationNot_read(): Promise<FetchResponse<200, types.GetV1ReservationNotReadResponse200>> {
    return this.core.fetch('/v1/reservation/not_read', 'get');
  }

  /**
   * Returns the detail for a Booking
   *
   * @summary Booking's details
   * @throws FetchError<400, types.GetBookingByIdResponse400> Bad Request
   * @throws FetchError<401, types.GetBookingByIdResponse401> Unauthorized
   * @throws FetchError<404, types.GetBookingByIdResponse404> Not Found
   * @throws FetchError<500, types.GetBookingByIdResponse500> Internal Server Error
   */
  getBookingById(metadata: types.GetBookingByIdMetadataParam): Promise<FetchResponse<200, types.GetBookingByIdResponse200>> {
    return this.core.fetch('/v1/reservation/booking/{id}', 'get', metadata);
  }

  /**
   * Updates a given Booking with the requested details.
   *
   * @summary Updates a booking
   * @throws FetchError<400, types.PutV1ReservationBookingIdResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdResponse500> Internal Server Error
   */
  putV1ReservationBookingId(body: types.PutV1ReservationBookingIdBodyParam, metadata: types.PutV1ReservationBookingIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  putV1ReservationBookingId(metadata: types.PutV1ReservationBookingIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  putV1ReservationBookingId(body?: types.PutV1ReservationBookingIdBodyParam | types.PutV1ReservationBookingIdMetadataParam, metadata?: types.PutV1ReservationBookingIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}', 'put', body, metadata);
  }

  /**
   * Removes a Booking, sending them to the trash, and making them recoverable
   *
   * @summary Deletes a booking
   * @throws FetchError<400, types.DeleteV1ReservationBookingIdResponse400> Bad Request
   * @throws FetchError<401, types.DeleteV1ReservationBookingIdResponse401> Unauthorized
   * @throws FetchError<404, types.DeleteV1ReservationBookingIdResponse404> Not Found
   * @throws FetchError<500, types.DeleteV1ReservationBookingIdResponse500> Internal Server Error
   */
  deleteV1ReservationBookingId(metadata: types.DeleteV1ReservationBookingIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}', 'delete', metadata);
  }

  /**
   * Returns the details of the Booking's current Quote
   *
   * @summary Quote's details
   * @throws FetchError<400, types.GetQuoteByBookingIdResponse400> Bad Request
   * @throws FetchError<401, types.GetQuoteByBookingIdResponse401> Unauthorized
   * @throws FetchError<404, types.GetQuoteByBookingIdResponse404> Not Found
   * @throws FetchError<500, types.GetQuoteByBookingIdResponse500> Internal Server Error
   */
  getQuoteByBookingId(metadata: types.GetQuoteByBookingIdMetadataParam): Promise<FetchResponse<200, types.GetQuoteByBookingIdResponse200>> {
    return this.core.fetch('/v1/reservation/booking/{id}/quote', 'get', metadata);
  }

  /**
   * Creates a Quote for the booking
   *
   * @summary Creates a quote
   * @throws FetchError<400, types.CreateQuoteForBookingResponse400> Bad Request
   * @throws FetchError<401, types.CreateQuoteForBookingResponse401> Unauthorized
   * @throws FetchError<404, types.CreateQuoteForBookingResponse404> Not Found
   * @throws FetchError<500, types.CreateQuoteForBookingResponse500> Internal Server Error
   */
  createQuoteForBooking(body: types.CreateQuoteForBookingBodyParam, metadata: types.CreateQuoteForBookingMetadataParam): Promise<FetchResponse<201, types.CreateQuoteForBookingResponse201>>;
  createQuoteForBooking(metadata: types.CreateQuoteForBookingMetadataParam): Promise<FetchResponse<201, types.CreateQuoteForBookingResponse201>>;
  createQuoteForBooking(body?: types.CreateQuoteForBookingBodyParam | types.CreateQuoteForBookingMetadataParam, metadata?: types.CreateQuoteForBookingMetadataParam): Promise<FetchResponse<201, types.CreateQuoteForBookingResponse201>> {
    return this.core.fetch('/v1/reservation/booking/{id}/quote', 'post', body, metadata);
  }

  /**
   * Returns the link to the payment page for the current quote
   *
   * @summary Payment link for a quote.
   * @throws FetchError<400, types.GetPaymentLinkResponse400> Bad Request
   * @throws FetchError<401, types.GetPaymentLinkResponse401> Unauthorized
   * @throws FetchError<404, types.GetPaymentLinkResponse404> Not Found
   * @throws FetchError<500, types.GetPaymentLinkResponse500> Internal Server Error
   */
  getPaymentLink(metadata: types.GetPaymentLinkMetadataParam): Promise<FetchResponse<200, types.GetPaymentLinkResponse200>> {
    return this.core.fetch('/v1/reservation/booking/{id}/quote/paymentLink', 'get', metadata);
  }

  /**
   * Create a payment link for the booking
   *
   * @summary Booking's payment link
   * @throws FetchError<400, types.CreatePaymentLinkResponse400> Bad Request
   * @throws FetchError<401, types.CreatePaymentLinkResponse401> Unauthorized
   * @throws FetchError<404, types.CreatePaymentLinkResponse404> Not Found
   * @throws FetchError<500, types.CreatePaymentLinkResponse500> Internal Server Error
   */
  createPaymentLink(body: types.CreatePaymentLinkBodyParam, metadata: types.CreatePaymentLinkMetadataParam): Promise<FetchResponse<201, types.CreatePaymentLinkResponse201>>;
  createPaymentLink(metadata: types.CreatePaymentLinkMetadataParam): Promise<FetchResponse<201, types.CreatePaymentLinkResponse201>>;
  createPaymentLink(body?: types.CreatePaymentLinkBodyParam | types.CreatePaymentLinkMetadataParam, metadata?: types.CreatePaymentLinkMetadataParam): Promise<FetchResponse<201, types.CreatePaymentLinkResponse201>> {
    return this.core.fetch('/v1/reservation/booking/{id}/quote/paymentLink', 'post', body, metadata);
  }

  /**
   * Returns the detail for a enquiry
   *
   * @summary Enquiry's details
   * @throws FetchError<400, types.GetEnquiryByIdResponse400> Bad Request
   * @throws FetchError<401, types.GetEnquiryByIdResponse401> Unauthorized
   * @throws FetchError<404, types.GetEnquiryByIdResponse404> Not Found
   * @throws FetchError<500, types.GetEnquiryByIdResponse500> Internal Server Error
   */
  getEnquiryById(metadata: types.GetEnquiryByIdMetadataParam): Promise<FetchResponse<200, types.GetEnquiryByIdResponse200>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}', 'get', metadata);
  }

  /**
   * Removes a Enquiry, sending them to the trash, and making them recoverable
   *
   * @summary Deletes an enquiry
   * @throws FetchError<400, types.DeleteV1ReservationEnquiryIdResponse400> Bad Request
   * @throws FetchError<401, types.DeleteV1ReservationEnquiryIdResponse401> Unauthorized
   * @throws FetchError<404, types.DeleteV1ReservationEnquiryIdResponse404> Not Found
   * @throws FetchError<500, types.DeleteV1ReservationEnquiryIdResponse500> Internal Server Error
   */
  deleteV1ReservationEnquiryId(metadata: types.DeleteV1ReservationEnquiryIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}', 'delete', metadata);
  }

  /**
   * Creates a new booking with the specified data
   *
   * @summary Creates a booking
   * @throws FetchError<400, types.PostV1ReservationBookingResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationBookingResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationBookingResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationBookingResponse500> Internal Server Error
   */
  postV1ReservationBooking(body?: types.PostV1ReservationBookingBodyParam, metadata?: types.PostV1ReservationBookingMetadataParam): Promise<FetchResponse<201, types.PostV1ReservationBookingResponse201>> {
    return this.core.fetch('/v1/reservation/booking', 'post', body, metadata);
  }

  /**
   * Creates a new enquiry with the data passed as Json
   *
   * @summary Creates an enquiry
   * @throws FetchError<400, types.PostV1ReservationEnquiryResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationEnquiryResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationEnquiryResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationEnquiryResponse500> Internal Server Error
   */
  postV1ReservationEnquiry(body: types.PostV1ReservationEnquiryBodyParam): Promise<FetchResponse<201, types.PostV1ReservationEnquiryResponse201>> {
    return this.core.fetch('/v1/reservation/enquiry', 'post', body);
  }

  /**
   * Creates a new CallMeBack Request. A call me back creates and enquiry and also sends an
   * email to the property account owner with an appointment to call the client back at some
   * concrete date/hour
   *
   * @summary Creates a callmeback
   * @throws FetchError<400, types.PostV1ReservationCallmebackResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationCallmebackResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationCallmebackResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationCallmebackResponse500> Internal Server Error
   */
  postV1ReservationCallmeback(body: types.PostV1ReservationCallmebackBodyParam): Promise<FetchResponse<201, types.PostV1ReservationCallmebackResponse201>> {
    return this.core.fetch('/v1/reservation/callmeback', 'post', body);
  }

  /**
   * Recovers a Booking from the trash
   *
   * @summary Recovers a booking
   * @throws FetchError<400, types.PutV1ReservationBookingIdRecoverResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdRecoverResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdRecoverResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdRecoverResponse500> Internal Server Error
   */
  putV1ReservationBookingIdRecover(metadata: types.PutV1ReservationBookingIdRecoverMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/recover', 'put', metadata);
  }

  /**
   * Recovers a Enquiry from the trash
   *
   * @throws FetchError<400, types.PutV1ReservationEnquiryIdRecoverResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationEnquiryIdRecoverResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationEnquiryIdRecoverResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationEnquiryIdRecoverResponse500> Internal Server Error
   */
  putV1ReservationEnquiryIdRecover(metadata: types.PutV1ReservationEnquiryIdRecoverMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}/recover', 'put', metadata);
  }

  /**
   * Reopens a Booking changing the status to Open and making the room available again if the
   * booking was on Booked
   *
   * @summary Reopens a booking
   * @throws FetchError<400, types.PutV1ReservationBookingIdReopenResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdReopenResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdReopenResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdReopenResponse500> Internal Server Error
   */
  putV1ReservationBookingIdReopen(metadata: types.PutV1ReservationBookingIdReopenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/reopen', 'put', metadata);
  }

  /**
   * Declines a booking changing the status to declined
   *
   * @summary Sets as declined a booking
   * @throws FetchError<400, types.PutV1ReservationBookingIdDeclineResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdDeclineResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdDeclineResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdDeclineResponse500> Internal Server Error
   */
  putV1ReservationBookingIdDecline(metadata: types.PutV1ReservationBookingIdDeclineMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/decline', 'put', metadata);
  }

  /**
   * Changes the status of a booking to tentative
   *
   * @summary Sets as tentative a booking
   * @throws FetchError<400, types.PutV1ReservationBookingIdTentativeResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdTentativeResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdTentativeResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdTentativeResponse500> Internal Server Error
   */
  putV1ReservationBookingIdTentative(metadata: types.PutV1ReservationBookingIdTentativeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/tentative', 'put', metadata);
  }

  /**
   * Changes the status of a booking to booked and updating the availability calendar
   *
   * @summary Sets as booked a booking
   * @throws FetchError<400, types.PutV1ReservationBookingIdBookResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdBookResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdBookResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdBookResponse500> Internal Server Error
   */
  putV1ReservationBookingIdBook(metadata: types.PutV1ReservationBookingIdBookMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/book', 'put', metadata);
  }

  /**
   * Sets as declined an enquiry
   *
   * @throws FetchError<400, types.PutV1ReservationEnquiryIdDeclineResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationEnquiryIdDeclineResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationEnquiryIdDeclineResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationEnquiryIdDeclineResponse500> Internal Server Error
   */
  putV1ReservationEnquiryIdDecline(metadata: types.PutV1ReservationEnquiryIdDeclineMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}/decline', 'put', metadata);
  }

  /**
   * Reopens an enquiry
   *
   * @throws FetchError<400, types.PutV1ReservationEnquiryIdReopenResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationEnquiryIdReopenResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationEnquiryIdReopenResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationEnquiryIdReopenResponse500> Internal Server Error
   */
  putV1ReservationEnquiryIdReopen(metadata: types.PutV1ReservationEnquiryIdReopenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}/reopen', 'put', metadata);
  }

  /**
   * Performs a batch deletion, removing and sending to trash a collection of bookings and
   * enquiries
   *
   * @summary Batch deletes bookings or enquiries
   * @throws FetchError<400, types.PostV1ReservationDeleteResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationDeleteResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationDeleteResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationDeleteResponse500> Internal Server Error
   */
  postV1ReservationDelete(body?: types.PostV1ReservationDeleteBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/delete', 'post', body);
  }

  /**
   * Request a payment for the given booking. It will send an email to the renter asking to
   * pay the AmountToPay
   *
   * @summary Requests a payment for a booking
   * @throws FetchError<400, types.PutV1ReservationBookingIdRequestPaymentResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdRequestPaymentResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdRequestPaymentResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdRequestPaymentResponse500> Internal Server Error
   */
  putV1ReservationBookingIdRequest_payment(metadata: types.PutV1ReservationBookingIdRequestPaymentMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/request_payment', 'put', metadata);
  }

  /**
   * Checkin a booking at the specified time
   *
   * @summary Checkin a booking at the specified time
   * @throws FetchError<400, types.PutV1ReservationBookingIdCheckinResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdCheckinResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdCheckinResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdCheckinResponse500> Internal Server Error
   */
  putV1ReservationBookingIdCheckin(body: types.PutV1ReservationBookingIdCheckinBodyParam, metadata: types.PutV1ReservationBookingIdCheckinMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/checkin', 'put', body, metadata);
  }

  /**
   * Checkout a booking at the specified time
   *
   * @summary Checkout a booking at the specified time
   * @throws FetchError<400, types.PutV1ReservationBookingIdCheckoutResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdCheckoutResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdCheckoutResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdCheckoutResponse500> Internal Server Error
   */
  putV1ReservationBookingIdCheckout(body: types.PutV1ReservationBookingIdCheckoutBodyParam, metadata: types.PutV1ReservationBookingIdCheckoutMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/checkout', 'put', body, metadata);
  }

  /**
   * Gets a quote
   *
   * @throws FetchError<400, types.GetV1QuotePropertyidResponse400> Bad Request
   * @throws FetchError<401, types.GetV1QuotePropertyidResponse401> Unauthorized
   * @throws FetchError<404, types.GetV1QuotePropertyidResponse404> Not Found
   * @throws FetchError<500, types.GetV1QuotePropertyidResponse500> Internal Server Error
   */
  getV1QuotePropertyid(metadata: types.GetV1QuotePropertyidMetadataParam): Promise<FetchResponse<200, types.GetV1QuotePropertyidResponse200>> {
    return this.core.fetch('/v1/quote/{propertyId}', 'get', metadata);
  }

  /**
   * Performs a batch mark as replied, marking as replied a collection of bookings and
   * enquiries
   *
   * @summary Batch marks as replied bookings or enquiries
   * @throws FetchError<400, types.PostV1ReservationRepliedResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationRepliedResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationRepliedResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationRepliedResponse500> Server Error
   */
  postV1ReservationReplied(body?: types.PostV1ReservationRepliedBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/replied', 'post', body);
  }

  /**
   * Performs a batch mark as not replied, marking as not replied a collection of bookings
   * and enquiries
   *
   * @summary Batch mark as not replied bookings and enquiries
   * @throws FetchError<400, types.PostV1ReservationNotRepliedResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationNotRepliedResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationNotRepliedResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationNotRepliedResponse500> Server Error
   */
  postV1ReservationNot_replied(body?: types.PostV1ReservationNotRepliedBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/not_replied', 'post', body);
  }

  /**
   * Marks a booking as replied
   *
   * @throws FetchError<400, types.PutV1ReservationBookingIdRepliedResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdRepliedResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdRepliedResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdRepliedResponse500> Server Error
   */
  putV1ReservationBookingIdReplied(metadata: types.PutV1ReservationBookingIdRepliedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/replied', 'put', metadata);
  }

  /**
   * Marks an enquiry as replied
   *
   * @throws FetchError<400, types.PutV1ReservationEnquiryIdRepliedResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationEnquiryIdRepliedResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationEnquiryIdRepliedResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationEnquiryIdRepliedResponse500> Server Error
   */
  putV1ReservationEnquiryIdReplied(metadata: types.PutV1ReservationEnquiryIdRepliedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}/replied', 'put', metadata);
  }

  /**
   * Marks a booking as not replied
   *
   * @throws FetchError<400, types.PutV1ReservationBookingIdNotRepliedResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationBookingIdNotRepliedResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationBookingIdNotRepliedResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationBookingIdNotRepliedResponse500> Server Error
   */
  putV1ReservationBookingIdNot_replied(metadata: types.PutV1ReservationBookingIdNotRepliedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/not_replied', 'put', metadata);
  }

  /**
   * Marks an enquiry as not replied
   *
   * @throws FetchError<400, types.PutV1ReservationEnquiryIdNotRepliedResponse400> Bad Request
   * @throws FetchError<401, types.PutV1ReservationEnquiryIdNotRepliedResponse401> Unauthorized
   * @throws FetchError<404, types.PutV1ReservationEnquiryIdNotRepliedResponse404> Not Found
   * @throws FetchError<500, types.PutV1ReservationEnquiryIdNotRepliedResponse500> Server Error
   */
  putV1ReservationEnquiryIdNot_replied(metadata: types.PutV1ReservationEnquiryIdNotRepliedMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}/not_replied', 'put', metadata);
  }

  /**
   * Add one or more messages for a specific booking.
   *
   * @summary Add messages to a booking
   * @throws FetchError<400, types.PostV1ReservationBookingIdMessagesResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationBookingIdMessagesResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationBookingIdMessagesResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationBookingIdMessagesResponse500> Server Error
   */
  postV1ReservationBookingIdMessages(body: types.PostV1ReservationBookingIdMessagesBodyParam, metadata: types.PostV1ReservationBookingIdMessagesMetadataParam): Promise<FetchResponse<number, unknown>>;
  postV1ReservationBookingIdMessages(metadata: types.PostV1ReservationBookingIdMessagesMetadataParam): Promise<FetchResponse<number, unknown>>;
  postV1ReservationBookingIdMessages(body?: types.PostV1ReservationBookingIdMessagesBodyParam | types.PostV1ReservationBookingIdMessagesMetadataParam, metadata?: types.PostV1ReservationBookingIdMessagesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/booking/{id}/messages', 'post', body, metadata);
  }

  /**
   * Add one or more messages for a specific enquiry.
   *
   * @summary Adds messages to an enquiry
   * @throws FetchError<400, types.PostV1ReservationEnquiryIdMessagesResponse400> Bad Request
   * @throws FetchError<401, types.PostV1ReservationEnquiryIdMessagesResponse401> Unauthorized
   * @throws FetchError<404, types.PostV1ReservationEnquiryIdMessagesResponse404> Not Found
   * @throws FetchError<500, types.PostV1ReservationEnquiryIdMessagesResponse500> Server Error
   */
  postV1ReservationEnquiryIdMessages(body: types.PostV1ReservationEnquiryIdMessagesBodyParam, metadata: types.PostV1ReservationEnquiryIdMessagesMetadataParam): Promise<FetchResponse<number, unknown>>;
  postV1ReservationEnquiryIdMessages(metadata: types.PostV1ReservationEnquiryIdMessagesMetadataParam): Promise<FetchResponse<number, unknown>>;
  postV1ReservationEnquiryIdMessages(body?: types.PostV1ReservationEnquiryIdMessagesBodyParam | types.PostV1ReservationEnquiryIdMessagesMetadataParam, metadata?: types.PostV1ReservationEnquiryIdMessagesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/reservation/enquiry/{id}/messages', 'post', body, metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { BookingsListMetadataParam, BookingsListResponse200, BookingsListResponse400, BookingsListResponse401, BookingsListResponse404, BookingsListResponse500, CreatePaymentLinkBodyParam, CreatePaymentLinkMetadataParam, CreatePaymentLinkResponse201, CreatePaymentLinkResponse400, CreatePaymentLinkResponse401, CreatePaymentLinkResponse404, CreatePaymentLinkResponse500, CreateQuoteForBookingBodyParam, CreateQuoteForBookingMetadataParam, CreateQuoteForBookingResponse201, CreateQuoteForBookingResponse400, CreateQuoteForBookingResponse401, CreateQuoteForBookingResponse404, CreateQuoteForBookingResponse500, DeleteV1ReservationBookingIdMetadataParam, DeleteV1ReservationBookingIdResponse400, DeleteV1ReservationBookingIdResponse401, DeleteV1ReservationBookingIdResponse404, DeleteV1ReservationBookingIdResponse500, DeleteV1ReservationEnquiryIdMetadataParam, DeleteV1ReservationEnquiryIdResponse400, DeleteV1ReservationEnquiryIdResponse401, DeleteV1ReservationEnquiryIdResponse404, DeleteV1ReservationEnquiryIdResponse500, DeleteWebhooksV1UnsubscribeBodyParam, DeleteWebhooksV1UnsubscribeResponse400, DeleteWebhooksV1UnsubscribeResponse401, DeleteWebhooksV1UnsubscribeResponse404, DeleteWebhooksV1UnsubscribeResponse500, GetBookingByIdMetadataParam, GetBookingByIdResponse200, GetBookingByIdResponse400, GetBookingByIdResponse401, GetBookingByIdResponse404, GetBookingByIdResponse500, GetEnquiryByIdMetadataParam, GetEnquiryByIdResponse200, GetEnquiryByIdResponse400, GetEnquiryByIdResponse401, GetEnquiryByIdResponse404, GetEnquiryByIdResponse500, GetPaymentLinkMetadataParam, GetPaymentLinkResponse200, GetPaymentLinkResponse400, GetPaymentLinkResponse401, GetPaymentLinkResponse404, GetPaymentLinkResponse500, GetPropertyByIdMetadataParam, GetPropertyByIdResponse200, GetPropertyByIdResponse400, GetPropertyByIdResponse401, GetPropertyByIdResponse404, GetPropertyByIdResponse500, GetQuoteByBookingIdMetadataParam, GetQuoteByBookingIdResponse200, GetQuoteByBookingIdResponse400, GetQuoteByBookingIdResponse401, GetQuoteByBookingIdResponse404, GetQuoteByBookingIdResponse500, GetV1AvailabilityMetadataParam, GetV1AvailabilityPropertyidMetadataParam, GetV1AvailabilityPropertyidResponse200, GetV1AvailabilityPropertyidResponse400, GetV1AvailabilityPropertyidResponse401, GetV1AvailabilityPropertyidResponse404, GetV1AvailabilityPropertyidResponse500, GetV1AvailabilityPropertyidRoomtypeidMetadataParam, GetV1AvailabilityPropertyidRoomtypeidResponse200, GetV1AvailabilityPropertyidRoomtypeidResponse400, GetV1AvailabilityPropertyidRoomtypeidResponse401, GetV1AvailabilityPropertyidRoomtypeidResponse404, GetV1AvailabilityPropertyidRoomtypeidResponse500, GetV1AvailabilityResponse200, GetV1AvailabilityResponse400, GetV1AvailabilityResponse401, GetV1AvailabilityResponse404, GetV1AvailabilityResponse500, GetV1ChannelRatesMetadataParam, GetV1ChannelRatesResponse200, GetV1ChannelRatesResponse400, GetV1ChannelRatesResponse401, GetV1ChannelRatesResponse404, GetV1ChannelRatesResponse500, GetV1ChannelXmlResponse200, GetV1ChannelXmlResponse400, GetV1ChannelXmlResponse401, GetV1ChannelXmlResponse404, GetV1ChannelXmlResponse500, GetV1CountriesCodeMetadataParam, GetV1CountriesCodeResponse200, GetV1CountriesCodeResponse400, GetV1CountriesCodeResponse401, GetV1CountriesCodeResponse404, GetV1CountriesCodeResponse500, GetV1CountriesResponse200, GetV1CountriesResponse400, GetV1CountriesResponse401, GetV1CountriesResponse404, GetV1CountriesResponse500, GetV1CurrenciesCodeMetadataParam, GetV1CurrenciesCodeResponse200, GetV1CurrenciesCodeResponse400, GetV1CurrenciesCodeResponse401, GetV1CurrenciesCodeResponse404, GetV1CurrenciesCodeResponse500, GetV1CurrenciesResponse200, GetV1CurrenciesResponse400, GetV1CurrenciesResponse401, GetV1CurrenciesResponse404, GetV1CurrenciesResponse500, GetV1PropertiesIdPaymentsMetadataParam, GetV1PropertiesIdPaymentsResponse200, GetV1PropertiesIdPaymentsResponse400, GetV1PropertiesIdPaymentsResponse401, GetV1PropertiesIdPaymentsResponse404, GetV1PropertiesIdPaymentsResponse500, GetV1PropertiesIdRatesAddonsMetadataParam, GetV1PropertiesIdRatesAddonsResponse200, GetV1PropertiesIdRatesAddonsResponse400, GetV1PropertiesIdRatesAddonsResponse401, GetV1PropertiesIdRatesAddonsResponse404, GetV1PropertiesIdRatesAddonsResponse500, GetV1PropertiesIdRoomsRidMetadataParam, GetV1PropertiesIdRoomsRidResponse200, GetV1PropertiesIdRoomsRidResponse400, GetV1PropertiesIdRoomsRidResponse401, GetV1PropertiesIdRoomsRidResponse404, GetV1PropertiesIdRoomsRidResponse500, GetV1QuotePropertyidMetadataParam, GetV1QuotePropertyidResponse200, GetV1QuotePropertyidResponse400, GetV1QuotePropertyidResponse401, GetV1QuotePropertyidResponse404, GetV1QuotePropertyidResponse500, GetV1ReservationNotReadResponse200, GetV1ReservationNotReadResponse400, GetV1ReservationNotReadResponse401, GetV1ReservationNotReadResponse404, GetV1ReservationNotReadResponse500, GetWebhooksV1ListResponse200, GetWebhooksV1ListResponse400, GetWebhooksV1ListResponse401, GetWebhooksV1ListResponse404, GetWebhooksV1ListResponse500, ListPropertiesMetadataParam, ListPropertiesResponse200, ListPropertiesResponse400, ListPropertiesResponse401, ListPropertiesResponse404, ListPropertiesResponse500, PostV1AvailabilityPropertyidRoomtypeidSetBodyParam, PostV1AvailabilityPropertyidRoomtypeidSetMetadataParam, PostV1AvailabilityPropertyidRoomtypeidSetResponse400, PostV1AvailabilityPropertyidRoomtypeidSetResponse401, PostV1AvailabilityPropertyidRoomtypeidSetResponse404, PostV1AvailabilityPropertyidRoomtypeidSetResponse500, PostV1ReservationBookingBodyParam, PostV1ReservationBookingIdMessagesBodyParam, PostV1ReservationBookingIdMessagesMetadataParam, PostV1ReservationBookingIdMessagesResponse400, PostV1ReservationBookingIdMessagesResponse401, PostV1ReservationBookingIdMessagesResponse404, PostV1ReservationBookingIdMessagesResponse500, PostV1ReservationBookingMetadataParam, PostV1ReservationBookingResponse201, PostV1ReservationBookingResponse400, PostV1ReservationBookingResponse401, PostV1ReservationBookingResponse404, PostV1ReservationBookingResponse500, PostV1ReservationCallmebackBodyParam, PostV1ReservationCallmebackResponse201, PostV1ReservationCallmebackResponse400, PostV1ReservationCallmebackResponse401, PostV1ReservationCallmebackResponse404, PostV1ReservationCallmebackResponse500, PostV1ReservationDeleteBodyParam, PostV1ReservationDeleteResponse400, PostV1ReservationDeleteResponse401, PostV1ReservationDeleteResponse404, PostV1ReservationDeleteResponse500, PostV1ReservationEnquiryBodyParam, PostV1ReservationEnquiryIdMessagesBodyParam, PostV1ReservationEnquiryIdMessagesMetadataParam, PostV1ReservationEnquiryIdMessagesResponse400, PostV1ReservationEnquiryIdMessagesResponse401, PostV1ReservationEnquiryIdMessagesResponse404, PostV1ReservationEnquiryIdMessagesResponse500, PostV1ReservationEnquiryResponse201, PostV1ReservationEnquiryResponse400, PostV1ReservationEnquiryResponse401, PostV1ReservationEnquiryResponse404, PostV1ReservationEnquiryResponse500, PostV1ReservationNotRepliedBodyParam, PostV1ReservationNotRepliedResponse400, PostV1ReservationNotRepliedResponse401, PostV1ReservationNotRepliedResponse404, PostV1ReservationNotRepliedResponse500, PostV1ReservationRepliedBodyParam, PostV1ReservationRepliedResponse400, PostV1ReservationRepliedResponse401, PostV1ReservationRepliedResponse404, PostV1ReservationRepliedResponse500, PostWebhooksV1SubscribeBodyParam, PostWebhooksV1SubscribeResponse201, PostWebhooksV1SubscribeResponse400, PostWebhooksV1SubscribeResponse401, PostWebhooksV1SubscribeResponse404, PostWebhooksV1SubscribeResponse409, PostWebhooksV1SubscribeResponse500, PutV1ReservationBookingIdBodyParam, PutV1ReservationBookingIdBookMetadataParam, PutV1ReservationBookingIdBookResponse400, PutV1ReservationBookingIdBookResponse401, PutV1ReservationBookingIdBookResponse404, PutV1ReservationBookingIdBookResponse500, PutV1ReservationBookingIdCheckinBodyParam, PutV1ReservationBookingIdCheckinMetadataParam, PutV1ReservationBookingIdCheckinResponse400, PutV1ReservationBookingIdCheckinResponse401, PutV1ReservationBookingIdCheckinResponse404, PutV1ReservationBookingIdCheckinResponse500, PutV1ReservationBookingIdCheckoutBodyParam, PutV1ReservationBookingIdCheckoutMetadataParam, PutV1ReservationBookingIdCheckoutResponse400, PutV1ReservationBookingIdCheckoutResponse401, PutV1ReservationBookingIdCheckoutResponse404, PutV1ReservationBookingIdCheckoutResponse500, PutV1ReservationBookingIdDeclineMetadataParam, PutV1ReservationBookingIdDeclineResponse400, PutV1ReservationBookingIdDeclineResponse401, PutV1ReservationBookingIdDeclineResponse404, PutV1ReservationBookingIdDeclineResponse500, PutV1ReservationBookingIdMetadataParam, PutV1ReservationBookingIdNotRepliedMetadataParam, PutV1ReservationBookingIdNotRepliedResponse400, PutV1ReservationBookingIdNotRepliedResponse401, PutV1ReservationBookingIdNotRepliedResponse404, PutV1ReservationBookingIdNotRepliedResponse500, PutV1ReservationBookingIdRecoverMetadataParam, PutV1ReservationBookingIdRecoverResponse400, PutV1ReservationBookingIdRecoverResponse401, PutV1ReservationBookingIdRecoverResponse404, PutV1ReservationBookingIdRecoverResponse500, PutV1ReservationBookingIdReopenMetadataParam, PutV1ReservationBookingIdReopenResponse400, PutV1ReservationBookingIdReopenResponse401, PutV1ReservationBookingIdReopenResponse404, PutV1ReservationBookingIdReopenResponse500, PutV1ReservationBookingIdRepliedMetadataParam, PutV1ReservationBookingIdRepliedResponse400, PutV1ReservationBookingIdRepliedResponse401, PutV1ReservationBookingIdRepliedResponse404, PutV1ReservationBookingIdRepliedResponse500, PutV1ReservationBookingIdRequestPaymentMetadataParam, PutV1ReservationBookingIdRequestPaymentResponse400, PutV1ReservationBookingIdRequestPaymentResponse401, PutV1ReservationBookingIdRequestPaymentResponse404, PutV1ReservationBookingIdRequestPaymentResponse500, PutV1ReservationBookingIdResponse400, PutV1ReservationBookingIdResponse401, PutV1ReservationBookingIdResponse404, PutV1ReservationBookingIdResponse500, PutV1ReservationBookingIdTentativeMetadataParam, PutV1ReservationBookingIdTentativeResponse400, PutV1ReservationBookingIdTentativeResponse401, PutV1ReservationBookingIdTentativeResponse404, PutV1ReservationBookingIdTentativeResponse500, PutV1ReservationEnquiryIdDeclineMetadataParam, PutV1ReservationEnquiryIdDeclineResponse400, PutV1ReservationEnquiryIdDeclineResponse401, PutV1ReservationEnquiryIdDeclineResponse404, PutV1ReservationEnquiryIdDeclineResponse500, PutV1ReservationEnquiryIdNotRepliedMetadataParam, PutV1ReservationEnquiryIdNotRepliedResponse400, PutV1ReservationEnquiryIdNotRepliedResponse401, PutV1ReservationEnquiryIdNotRepliedResponse404, PutV1ReservationEnquiryIdNotRepliedResponse500, PutV1ReservationEnquiryIdRecoverMetadataParam, PutV1ReservationEnquiryIdRecoverResponse400, PutV1ReservationEnquiryIdRecoverResponse401, PutV1ReservationEnquiryIdRecoverResponse404, PutV1ReservationEnquiryIdRecoverResponse500, PutV1ReservationEnquiryIdReopenMetadataParam, PutV1ReservationEnquiryIdReopenResponse400, PutV1ReservationEnquiryIdReopenResponse401, PutV1ReservationEnquiryIdReopenResponse404, PutV1ReservationEnquiryIdReopenResponse500, PutV1ReservationEnquiryIdRepliedMetadataParam, PutV1ReservationEnquiryIdRepliedResponse400, PutV1ReservationEnquiryIdRepliedResponse401, PutV1ReservationEnquiryIdRepliedResponse404, PutV1ReservationEnquiryIdRepliedResponse500, RatesCalendarMetadataParam, RatesCalendarResponse200, RatesCalendarResponse400, RatesCalendarResponse401, RatesCalendarResponse404, RatesCalendarResponse500, SaveTinyBodyParam, SaveTinyResponse200, SaveTinyResponse400, SaveTinyResponse401, SaveTinyResponse404, SaveTinyResponse500 } from './types';
