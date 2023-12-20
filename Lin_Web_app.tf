resource "azurerm_service_plan" "asp" {
  name                = "march-asp"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
  depends_on = [ azurerm_resource_group.rg ]

}

resource "azurerm_linux_web_app" "app" {
  name                = "march-app"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.asp.id

  site_config {}
  depends_on = [ azurerm_service_plan.asp ]
}
