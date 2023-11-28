using Microsoft.AspNetCore.Mvc;
using UHR.Models;

namespace UHR.Interfaces
{
    public interface ICityInterface
    {
        ICollection<City> GetCities();

        ICollection<City> AddCities(ICollection<City> cities);

        City GetCityById(int id);
    }
}
