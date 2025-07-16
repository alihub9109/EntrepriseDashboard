// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading delay
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 300);
    }, 1000);

    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.querySelector('.mobile-sidebar-overlay');
    
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarToggleMobile.addEventListener('click', toggleSidebar);
    mobileOverlay.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target) || 
                              sidebarToggleMobile.contains(event.target);
        
        if (window.innerWidth <= 992 && !isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update charts for dark mode
        updateChartsForTheme();
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Initialize charts
    initializeCharts();

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.notification-dropdown')) {
            document.querySelectorAll('.notification-dropdown-content').forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.top = '120%';
            });
        }
        
        if (!event.target.closest('.user-dropdown')) {
            document.querySelectorAll('.user-dropdown-content').forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.top = '120%';
            });
        }
    });

    // Window resize handler
    window.addEventListener('resize', function() {
        // Close sidebar if window is resized to larger than 992px
        if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Update charts on resize
        if (window.lineChart) window.lineChart.resize();
        if (window.barChart) window.barChart.resize();
    });
});

// Initialize Chart.js charts
function initializeCharts() {
    // Line Chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    window.lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 20000, 17000, 22000, 24780],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: getChartOptions('$')
    });

    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    window.barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Electronics', 'Clothing', 'Home', 'Books', 'Other'],
            datasets: [{
                label: 'Sales',
                data: [12000, 8000, 6000, 3500, 5000],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(248, 37, 133, 0.7)',
                    'rgba(248, 150, 30, 0.7)',
                    'rgba(111, 66, 193, 0.7)'
                ],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(76, 201, 240, 1)',
                    'rgba(248, 37, 133, 1)',
                    'rgba(248, 150, 30, 1)',
                    'rgba(111, 66, 193, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: getChartOptions('$')
    });
}

// Get chart options based on theme
function getChartOptions(prefix = '') {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDarkMode ? '#f0f0f0' : '#333';
    
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: textColor
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return prefix + context.parsed.y.toLocaleString();
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: gridColor,
                    drawBorder: false
                },
                ticks: {
                    color: textColor,
                    callback: function(value) {
                        return prefix + value.toLocaleString();
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: textColor
                }
            }
        }
    };
}

// Update charts when theme changes
function updateChartsForTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDarkMode ? '#f0f0f0' : '#333';
    
    if (window.lineChart) {
        window.lineChart.options.scales.y.grid.color = gridColor;
        window.lineChart.options.scales.y.ticks.color = textColor;
        window.lineChart.options.scales.x.ticks.color = textColor;
        window.lineChart.update();
    }
    
    if (window.barChart) {
        window.barChart.options.scales.y.grid.color = gridColor;
        window.barChart.options.scales.y.ticks.color = textColor;
        window.barChart.options.scales.x.ticks.color = textColor;
        window.barChart.update();
    }
}
