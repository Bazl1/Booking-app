using System.Security.Claims;
using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using Booking.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Queries;

public class QueriesHandler(
    IUnitOfWork unitOfWork,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<GetById.Request, GetById.Response>,
    IRequestHandler<GetAll.Request, GetAll.Response>,
    IRequestHandler<GetReservationDates.Request, GetReservationDates.Response>
{
    public HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<GetById.Response> Handle(GetById.Request request, CancellationToken cancellationToken)
    {
        if (unitOfWork.Adverts.GetById(request.Id) is not Advert advert)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                "Advert with given id is not found"
            );

        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);

        var author = new UserDto
        {
            Id = Guid.NewGuid().ToString(),
            Avatar = "",
            Name = "Cyril",
            Initials = "Cy",
            Email = "cyril@morozov.com",
            PhoneNumber = "+380000000000"
        };
        var reviews = new List<ReviewDto>
        {
            new ReviewDto
            {
                Id = Guid.NewGuid().ToString(),
                Stars = 1,
                Description = "Это была ловушка сдесь охотиться СВЕТА. Она буквально заманивает людей в секс рабство.",
                Author = author
            },
            new ReviewDto
            {
                Id = Guid.NewGuid().ToString(),
                Stars = 2,
                Description = "Это было просто восхитительно когда владелец дома встретил нас с бутылкой шампанского холел бы я сказать но нас встретили с ведром дерьма в ебало. После этого на нас были спущены бомжы которые стоят на страже этого поместья. Особенно хочеться отметить бомжыгу Светлану которая не просто отпиздила и оставила нас умирать в холодной луже с дерьмом но также и позаботилась о том что бы эта лужа говна поплнялась каждые 2 минуты до того момента пока мы не захлебнемся в дерьме. Можно сказать что нам сказачно повезло что наш хозяин Светлана(та самая бомжиха) которая согласилась нас приютить в замент на небольшую помошь по дому. Радует что Светлана сразу обозначила правила совмесного проживания в ёё великолепной 2 комнотной коробки от холодильника, она сразу дала понять что она сдесь главная по этому мы называем ёё хозяин и помогаем ей во все что она хочет ведь она подарила нам самое главное и дорогое для нас ЖИЗНЬ.",
                Author = author
            },
            new ReviewDto
            {
                Id = Guid.NewGuid().ToString(),
                Stars = 3,
                Description = "Был обычный день когда я спонтанно решила прогруляться по прекрасному городу Педоград. Как вдруг изза угла выехал черный грузовик уже через мгновение я была в темном месте, вскоре я осознала что это была коробка от холодильника. Через довольно долгий промежуток  времени меня выбросили в месте с моим будущим домом коробкой выбросили у поместья невообразимых масштабов. Уже через неделю я потеряла человечность и начала охотиться на людей. Я стала главарем бомжей в своем районе. Также мне удалось споймать двух рабов (они приехали по объявлению о оренде жилья) они вежливо называют меня хозяин. Я принцыпе мне понравилось это объявление я все рекомендую.",
                Author = author
            },
            new ReviewDto
            {
                Id = Guid.NewGuid().ToString(),
                Stars = 4,
                Description = "Светлана просто великолепна.",
                Author = author
            },
            new ReviewDto
            {
                Id = Guid.NewGuid().ToString(),
                Stars = 5,
                Description = "Света 5 звезд.",
                Author = author
            },
        };

        return new(
            advert.Id,
            advert.Name,
            advert.Description,
            mapper.Map<UserDto>(advert.Owner, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"),
            advert.PricePerNight,
            advert.NumberOfBathrooms,
            advert.NumberOfSingleBeds,
            advert.NumberOfDoubleBeds,
            advert.MaxPeople,
            new Amenities
            {
                Wifi = advert.Wifi,
                PetsAllowed = advert.PetsAllowed,
                TV = advert.TV,
                Refrigerator = advert.Refrigerator,
                Kitchen = advert.Kitchen,
                Washer = advert.Washer,
                Heating = advert.Heating,
                Dryer = advert.Dryer
            },
            advert.Photos.Select(photo => $"{Context.Request.Scheme}://{Context.Request.Host}/{photo}").ToList(),
            reviews,
            mapper.Map<CategoryDto>(advert.Category),
            0,
            user.Likes.Any(a => a.Id == advert.Id)
        );
    }

    public async Task<GetAll.Response> Handle(GetAll.Request request, CancellationToken cancellationToken)
    {
        if (request.Page < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Page must be greater than 0"
            );
        if (request.Limit < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Limit must be greater than 0"
            );

        var adverts = unitOfWork.Adverts.Search(request.Query, request.UserId).ToList();

        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);

        return new(
            mapper.Map<IEnumerable<AdvertDto>>(
                adverts
                    .Skip((request.Page - 1) * request.Limit)
                    .Take(request.Limit),
                opt =>
                {
                    opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}";
                    opt.Items["USER_LIKES"] = user.Likes;
                }
            ),
            (int)Math.Ceiling((double)adverts.Count / (double)request.Limit)
        );
    }

    public async Task<GetReservationDates.Response> Handle(GetReservationDates.Request request, CancellationToken cancellationToken)
    {
        var startDate = new DateOnly(
            year: request.Year,
            month: request.Month,
            day: 1
        );
        var endDate = new DateOnly(
            year: request.Year,
            month: request.Month,
            day: DateTime.DaysInMonth(request.Year, request.Month)
        );
        var reservations = unitOfWork.Reservations.GetByAdvertId(advertId: request.Id, start: startDate, end: endDate);
        List<string> dates = new();
        for (var curDate = startDate; curDate <= endDate; curDate = curDate.AddDays(1))
            if (reservations.Any(r => r.StartDate <= curDate && curDate <= r.EndDate))
                dates.Add(curDate.ToString("dd/MM/yy"));
        return new(dates);
    }
}