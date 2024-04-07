using Booking.Application.Dtos;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/reviews")]
public class ReviewsController : ControllerBase
{
    private readonly List<ReviewDto> mockReviews;

    public ReviewsController()
    {
        var author = new UserDto
        {
            Id = Guid.NewGuid().ToString(),
            Avatar = "",
            Name = "Cyril",
            Initials = "Cy",
            Email = "cyril@morozov.com",
            PhoneNumber = "+380000000000"
        };
        mockReviews = new List<ReviewDto>
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
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string advertId
    )
    {
        return Ok(mockReviews);
    }
}