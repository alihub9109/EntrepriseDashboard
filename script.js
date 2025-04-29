 // Sidebar Toggle
 document.getElementById('sidebarToggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('collapsed');
    document.querySelector('.main').classList.toggle('expanded');
});

// Initialize DataTable
document.addEventListener('DOMContentLoaded', function() {
    $('#transactionsTable').DataTable({
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search transactions...",
        }
    });
});

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Revenue',
            data: [12500, 19000, 15000, 21000, 25000, 28000, 32000, 29000, 35000, 40000, 38000, 42000],
            backgroundColor: 'rgba(67, 97, 238, 0.1)',
            borderColor: '#4361ee',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#4361ee',
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1a1a2e',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 12
                },
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: '#e9ecef'
                },
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// Category Chart
const categoryCtx = document.getElementById('categoryChart').getContext('2d');
const categoryChart = new Chart(categoryCtx, {
    type: 'doughnut',
    data: {
        labels: ['Electronics', 'Fashion', 'Home & Garden', 'Health & Beauty', 'Sports'],
        datasets: [{
            data: [35, 25, 20, 12, 8],
            backgroundColor: [
                '#4361ee',
                '#3f37c9',
                '#4cc9f0',
                '#f8961e',
                '#f72585'
            ],
            borderWidth: 0,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1a1a2e',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 12
                },
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.raw + '%';
                    }
                }
            }
        }
    }
});

// Add fade-in animation to elements when page loads
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
    });
    
    setTimeout(() => {
        fadeElements.forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});
