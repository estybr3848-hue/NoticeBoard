using NoticeBoardBLL;
using NoticeBoardDAL.Data;
using NoticeBoardDAL.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.Configure<JsonLoaderOptions>(options =>
{
    options.JsonPath = Path.Combine(AppContext.BaseDirectory, "Data/Notices.json");
});

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSingleton<JsonLoader>();

builder.Services.AddScoped<NoticeService>();

builder.Services.AddScoped<AuthService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
